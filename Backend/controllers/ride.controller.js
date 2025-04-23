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
        
        // Add more detailed logging
        console.log('Creating ride with:', {
            user: req.user._id,
            pickup, 
            destination,
            vehicleType
        });

        // Create ride first
        const ride = await rideService.createRide({
            user: req.user._id, 
            pickup, 
            destination, 
            vehicleType
        });
        console.log('Ride created:', ride);

        // Get coordinates only after ride is created successfully
        try {
            const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
            console.log('Pickup coordinates:', pickupCoordinates);
            
            if (pickupCoordinates && pickupCoordinates.lat && pickupCoordinates.lng) {
                const captainsInRadius = await mapService.getCaptainsInTheRadius(
                    pickupCoordinates.lat, 
                    pickupCoordinates.lng, 
                    2
                );
                console.log('Found captains in radius:', captainsInRadius);
                
                const rideWithUser = await rideModel.findOne({_id: ride._id}).populate('user');
                console.log('Ride with user details:', rideWithUser);
                
                // Notify available captains
                captainsInRadius.forEach(captain => {
                    console.log('Attempting to notify captain:', captain._id);
                    console.log('Captain socket ID:', captain.socketId);
                    
                    if (captain.socketId) {
                        console.log('Sending notification to captain socket:', captain.socketId);
                        sendMessageToSocketId(captain.socketId, {
                            event: 'new-ride',
                            data: rideWithUser
                        });
                    } else {
                        console.log('Captain has no socket ID, skipping notification');
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
    console.log('Confirm ride request received:', req.body);
    console.log('Captain from request:', req.captain);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    
    const {rideId} = req.body;
    if (!rideId) {
        console.log('No ride ID provided');
        return res.status(400).json({error: 'Ride ID is required'});
    }

    try {
        const ride = await rideService.confirmRide({
            rideId,
            captain: req.captain
        });
        
        console.log('Ride confirmed:', ride);

        if(!ride) {
            console.log('Ride not found');
            return res.status(404).json({error: 'Ride not found'});
        }

        if (ride.user?.socketId) {
            console.log('Sending confirmation to user socket:', ride.user.socketId);
            sendMessageToSocketId(ride.user.socketId, {
                event: 'ride-confirmed',
                data: ride
            });
            console.log('Notification sent to user');
        } else {
            console.log('No user socket ID found');
        }

        return res.status(200).json({ride});
    } catch (error) {
        console.error('Error confirming ride:', error);
        return res.status(500).json({error: error.message});
    }
}