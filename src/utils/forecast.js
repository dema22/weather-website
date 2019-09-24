const request = require("request");

// Forecast make a request to the api darsky 
// If there is an error, depending of the type, we call the callback function.
// If there is a response, we just call the callback function with the weather string.

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/6ac8c720f6cef41ed25ba55a0be90679/" + latitude + "," + longitude + "?units=si";

    // Using shorthan object syntax on url.
    //{body} i am destructuring the response
    request({ url, json: true }, (error,{body}) => {
        if (error) {
            callback("Unable to connect with weather service.", undefined);
        } else if (body.error) {
            callback("Unable to find location.", undefined);
        } else {
            const weatherData = body.daily.data[0].summary + `It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability} chance of rain.` + ` The maximum temperate of the day is ${body.daily.data[0].temperatureHigh} and the minimum temperate is ${body.daily.data[0].temperatureLow }.`;
            callback(undefined, weatherData);
        }
    });
};

module.exports = forecast;