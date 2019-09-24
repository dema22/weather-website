// CORE MODULES: Load core module to manipulate files and directory path.
const path = require("path");

// NPM: load express and hbs npm
const express = require("express");
const hbs = require("hbs");

// Load our modules
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Create a new express application
const app = express();

// Define environment variable value  for heroku OR 3000 to work locally
const port = process.env.PORT || 3000;

// Defined paths for Express config.
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location:

app.set("view engine", "hbs"); // Setup the hbs npm to use. Every time we use render we dont have to included the extension (.hbs)!
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve.
app.use(express.static(publicDirectoryPath));


// Rendering views with dynamic values passing to the template.
app.get("", (req, res)=>{
    res.render("index", {
        title: "Weather",
        name: "Felipe Demaria"
    });
});

// Rendering views with dynamic values passing to the template.
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Felipe Demaria"
    });
});

// Rendering views with dynamic values passing to the template.
app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Felipe Demaria",
        helpMessage: "We are here to help you"
    });
});

// The weather route will first check if there is a query string.
// If there is not one we return an error to the client.
// If there is: First we make a call to geocode function. We either get an error or the data (which is the latitude and longitude for the adress)
// After that we use latitude and longitude when we call forecast. We either get an error or the forecast.


app.get("/weather", (req, res) => {
    const address = req.query.address;
    console.log(address);
    if(!address){
        return res.send({error: "You must provide an adress"});
    }

    geocode(address, (error, {latitude, longitude, location} = {} ) => {
        if(error){
            return res.send({error: error});
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error: error});
            }
            
            res.send({
                location: location,
                forecast: forecastData,
                address:  address
            });
        });
    });
});


// Match evertyhing that didnt match if they are in help
app.get("/help/*", (req, res) => {
    res.render("404",{
        title: "404 Help.",
        name: "Felipe Demaria",
        errorMessage: "Help article not found."
    });
});


// Match evertyhing that hasnt been match so far
app.get("*", (req, res) => {
    res.render("404",{
        title: "404",
        name: "Felipe Demaria",
        errorMessage: "Page not found."
    });
});

// Starting the server
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

