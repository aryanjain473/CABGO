const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
//user autintication middleware
module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token){
     return res.status(401).json({ message: 'Token not provided' });
    }
    const isblacklistedToken = await blacklistTokenModel.findOne({ token });

    if(isblacklistedToken){
        return res.status(401).json({ message: 'Token is blacklisted' });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;

        return next();
      
    }
    catch(error){
        return res.status(401).json({ message: 'Token is invalid' });
    }
}