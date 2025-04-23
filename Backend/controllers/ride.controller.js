const rideService = require('../services/ride.service');
const {validationResult} = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId} = require('../socket');
const rideModel = require('../models/ride.model');


module.exports.createRide = async (req, res) => {
    try {
        // Check if user exists in request
        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { pickup, destination, vehicleType } = req.body;
        console.log('Creating ride with:', { userId: req.user._id, pickup, destination, vehicleType });
        
        const ride = await rideService.createRide({
            user: req.user._id, 
            pickup, 
            destination, 
            vehicleType
        });

        res.status(201).json({ ride });
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        const captainsInRadius =  await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd,pickupCoordinates.lng, 2)
        ride.otp = ""
        const rideWithUser = await rideModel.findOne({_id: ride._id}).populate('user')

        captainsInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })
    } catch (error) {
        console.error('Error in createRide controller:', error);
        return res.status(500).json({ error: error.message || 'Internal server error' });
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const {pickup, destination} = req.query;
    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json({fare});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const {rideId} = req.body;
    try {
        const ride = await rideService.confirmRide(rideId, req.captain._id);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        if(!ride){
            return res.status(404).json({error: 'Ride not found'});
        }
        return res.status(200).json({ride});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}