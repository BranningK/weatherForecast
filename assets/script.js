//var cityTitle = document.getElementById('cityTitle');
var cityTitle = $('#cityTitle');
var currentDate = $('#currentDate');

let APIkey = "6263ccfbb1c32f882fe28992cf9e4cdd"

fetch('http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=6263ccfbb1c32f882fe28992cf9e4cdd');
var pageMode = $('#flexSwitchCheckDefault');
var searchButton = $('#searchBtn');
console.log('hi');

searchButton.click(function() {
    getWeatherData();
});

if (pageMode != '#flexSwitchCheckDefault') {
    console.log('make light')
}


function getWeatherData() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Raleigh&appid=6263ccfbb1c32f882fe28992cf9e4cdd&units=imperial', {
    method: 'GET',
    credentials: 'same-origin',
    redirect: 'follow',
})
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var location = data.name;
        console.log(location)
        var lowTemp = data.main.temp_min;
        console.log('Low: ')
        console.log(lowTemp);
        var currentTemp = data.main.temp;
        console.log('Current temp: ')
        console.log(currentTemp);
        var highTemp = data.main.temp_max;
        console.log('High: ')
        console.log(highTemp);
        var weatherConditions = data.weather[0].description;
        console.log('Current conditions: ')
        console.log(weatherConditions);

        cityTitle[0].textContent = location;
        console.log(cityTitle);
        currentDate[0].textContent = location

        // data to make forecast request
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        console.log(lat, lon);

        // we could put our SECOND FETCH CALL here  --> OR pass the data needed to the function
        // pass lat and lon
        fetchForcast(lat, lon);
    });
}

function fetchForcast(lat, lon) {

    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`;
    console.log(forecastUrl);


    fetch(forecastUrl)
        .then(function(response) {
            console.log(response);
            return response.json();
        })
        .then(data => {
            console.log("Data: ", data)

            // we want to pull apart the 'dt_txt'

            // how do we convert a STRING to ARRAY and ARRAY to STRING
            let test = "Hello There Friend";
            let result = test.split(" ")  // ["Hello", "Theree", "Friende"]
            let last = result[result.length - 1];

            // ARRAY.join();
        })
        .catch(error => {
            console.log(error)
        });
}


