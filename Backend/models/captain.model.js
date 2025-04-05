const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const captainSchema = new mongoose.Schema({
    fullname:{
        firstname: {
            type: String,
            required: true,
            minlength: [3,'first name must be at least 3 characters long']
        },
        lastname:{
            type: String,
            required: true,
            minlength: [3,'last name must be at least 3 characters long']
        }
    },
   email: {
            type: String,
            required: true,
            unique: true, // This creates a unique index
            lowercase: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email']
        },
          


    password:{
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long']
    },
    socketId:{
        type: String,
        default: null // Optional field
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },   
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'color must be at least 3 characters long']
        },
        plate: {
            type: String,
            required: true,
            minlength: [6, 'plate must be at least 6 characters long']
        },
        capacity: {
            type: Number,
            required: true,
            min: [1,'capacity must be at least 1'],
            
    
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto'],
        },
        location: {
            lat:{
                type: Number,
            },
            lon: {
                type: Number,
            }
        }

    }
})
//token generation method for captain
captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h'})
    return token;
}
//password encryption method for captain
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
//hashing password before saving
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;