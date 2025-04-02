const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.services');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password, vehicle } = req.body;

    const iscaptainalreadyExist = await captainModel.findOne({ email });

    if(iscaptainalreadyExist){
        return res.status(400).json({ message: 'Captain already exist' });
    }
    const  hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createdCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    });
    const token = captain.generateAuthToken();

    res.status(201).json({ captain, token });
}