const rideService = require('../services/ride.service');
const {validationResult} = require('express-validator');

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