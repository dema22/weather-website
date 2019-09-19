const request = require("request");

// Functions that make the request to the mapbox api.
// Takes two arguments, the adress we want to use and a callback.
// Once the request finish, we check for errors, if they are, we just call the callback function with the error and no data.
// In case there are no errors, we just call the callback function with a data object, containing the
// latitude, longitude and the especif location.

const geocode = (adress, callback) => {
    //EncodeURIComponent -> Encodes a text string as a valid component of a Uniform Resource Identifier (URI).
    // So if we have special characters on our adress it wont crash.

    const urlGeolocation = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(adress) + ".json?access_token=pk.eyJ1IjoiZGVtYW1kcSIsImEiOiJjazA2NnMzZHowMWw5M2dydWVsY3l6ZHZqIn0.vpRWbWv_uo3fQo9woXC7Sg&limit=1";
    
    // {body} am i destructuring the response object
    request({url: urlGeolocation, json: true}, (error, {body}) => {
        if(error){
            callback("Unable to connect to location services.", undefined);
        }else if(body.features.length === 0){
            callback("Unable to find location. Please try with another search.", undefined);
        }else{
            callback(undefined,{
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            });
        }
    });
};

module.exports = geocode;