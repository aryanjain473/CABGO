const axios = require('axios');
const captainModel = require('../models/captain.model');


    module.exports.getAddressCoordinate = async (address) => {
      const apiKey = 'AIzaSyCS9L0pd2x9boBbdWh3Dla1idMDxUOIInU';
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
      try {
        const response = await axios.get(url);
        
    
        if (response.data.status === 'OK') {
          const location = response.data.results[0].geometry.location;
          return {
            lat: location.lat,
            lng: location.lng
          };
        } else {
          throw new Error('Unable to fetch coordinates');
        }
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    };
    
module.exports.getDistanceTime = async(origin, destination) => {
  if(!origin || !destination) {
    throw new Error('Origin and destinations are required');
  }
const apiKey = process.env.GOOGLE_MAPS_API;
  
 const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
  

  try{

    const response = await axios.get(url);
    if(response.data.status === 'OK'){

      if( response.data.rows[0].elements[0].status === 'ZERO_RESULTS'){
        throw new Error('no routes found');
      }
      return response.data.rows[0].elements[0];
    }else {
      throw new Error('unable to fetch distance and time');
    }
  }catch(err){
    console.error(err);
    throw err;

  }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
      throw new Error('query is required');
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

  try {
      const response = await axios.get(url);
      if (response.data.status === 'OK') {
          return response.data.predictions.map(prediction => prediction.description).filter(value => value);
      } else {
          throw new Error('Unable to fetch suggestions');
      }
  } catch (err) {
      console.error(err);
      throw err;
  }
}

module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
    if (!lat || !lng) {
        throw new Error('Invalid coordinates');
    }

    try {
        const captains = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[Number(lng), Number(lat)], radius / 6371]
                }
            }
        });
        return captains;
    } catch (error) {
        console.error('Error finding captains:', error);
        return [];
    }
}