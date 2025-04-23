const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
  if (!address || typeof address !== 'string') {
    throw new Error('Invalid address provided');
  }

  const apiKey = process.env.GOOGLE_MAPS_API; // Use environment variable instead of hardcoded key
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    
    if (response.data.status === 'OK' && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      
      // Validate coordinates
      if (!isValidCoordinate(location.lat) || !isValidCoordinate(location.lng)) {
        throw new Error('Invalid coordinates received from API');
      }

      return {
        lat: location.lat,
        lng: location.lng
      };
    } else {
      throw new Error(`Geocoding failed: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Geocoding error:', error.message);
    throw new Error('Failed to get location coordinates');
  }
};

// Add helper function to validate coordinates
function isValidCoordinate(coord) {
  return typeof coord === 'number' && 
         !isNaN(coord) && 
         isFinite(coord) && 
         Math.abs(coord) <= 180;
}

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