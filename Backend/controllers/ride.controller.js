const rideService = require('../services/ride.service');
const {validationResult} = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId} = require('../socket');
const rideModel = require('../models/ride.model');


module.exports.createRide = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { pickup, destination, vehicleType } = req.body;
        
        // Create ride first
        const ride = await rideService.createRide({
            user: req.user._id, 
            pickup, 
            destination, 
            vehicleType
        });

        // Get coordinates only after ride is created successfully
        try {
            const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
            if (pickupCoordinates && pickupCoordinates.lat && pickupCoordinates.lng) {
                const captainsInRadius = await mapService.getCaptainsInTheRadius(
                    pickupCoordinates.lat, 
                    pickupCoordinates.lng, 
                    2
                );
                
                const rideWithUser = await rideModel.findOne({_id: ride._id}).populate('user');
                
                // Notify available captains
                captainsInRadius.forEach(captain => {
                    if (captain.socketId) {
                        sendMessageToSocketId(captain.socketId, {
                            event: 'new-ride',
                            data: rideWithUser
                        });
                    }
                });
            }
        } catch (error) {
            console.error('Error notifying captains:', error);
            // Don't return here - we still want to send the ride response
        }

        return res.status(201).json({ ride });

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