console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne =  document.querySelector("#message-one");
const messageTwo =  document.querySelector("#message-two");



// Add an event listener when someone submit the form
weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = searchElement.value;

    // Using fetch api to fetch from our /weather route.
    // We provide the query string.
    // We will get the response with the forecast, we parsed it and the we check for an error
    // We show the error or the fore cast data if everything went well.

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
        response.json().then((forecastData) => {
            if (forecastData.error) {
                messageOne.textContent = forecastData.error;
            } else {
                messageOne.textContent = forecastData.location;
                messageTwo.textContent = forecastData.forecast;
            }
        });
    });

});