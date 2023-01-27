let cityTitle = $('#cityTitle');
let currentDate = $('#currentDate');
let currentTemp = $('#currentTemp');
let icon = $('#weatherIcon');
let wind = $('#windSpeed');
let humidity = $('#humidity');

let APIkey = "6263ccfbb1c32f882fe28992cf9e4cdd"

fetch('http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=6263ccfbb1c32f882fe28992cf9e4cdd');
var pageMode = $('#flexSwitchCheckDefault');
var searchButton = $('#searchBtn');

searchButton.click(function() {
    getWeatherData();
});

// if (pageMode != '#flexSwitchCheckDefault') {
//     console.log('make light')
// }


function getWeatherData() { //Remember to change Raleigh to selected city from search
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Raleigh&appid=${APIkey}&units=imperial`, {
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
        console.log('city name:', location);
        var lowTemp = data.main.temp_min;
        console.log('Low: ', lowTemp);
        var currTemp = data.main.temp;
        console.log('Current temp:', currTemp);
        var highTemp = data.main.temp_max;
        console.log('High:', highTemp);
        var weatherConditions = data.weather[0].description;
        console.log('Current conditions:', weatherConditions);
        var windSpeed = data.wind.speed;
        console.log('wind speed:', windSpeed);
        var windDir = data.wind.deg;
        console.log('wind direction(degrees):', windDir);
        // Function that turns raw degrees into cardinal directions
        function degToCompass(num) {
            var val = Math.floor((num / 22.5) + 0.5);
            var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
            return arr[(val % 16)];
        };
        console.log('wind direction (cardinal): ', degToCompass(windDir));
        var hum = data.main.humidity;
        console.log('humidity', hum, '%');

        cityTitle[0].textContent = location;
        console.log(cityTitle);
        currentTemp[0].textContent = ('Temp: ' + currTemp + '°F');
        currentDate[0].textContent = dayjs().format('ddd M/D/YYYY');
        wind[0].textContent = ('Wind Speed: ' + windSpeed + ' MPH ' + degToCompass(windDir));
        humidity[0].textContent = ('Humidity: ' + hum + '%');

        // data to make forecast request
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        console.log('Coordinates:', lat, lon);

        // we could put our SECOND FETCH CALL here  --> OR pass the data needed to the function
        // pass lat and lon
        fetchForcast(lat, lon);
    });
}

function fetchForcast(lat, lon) {

    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`;
    console.log(forecastUrl);


    fetch(forecastUrl)
        .then(function(response) {
            console.log(response);
            return response.json();
        })
        .then(data => {
            console.log("Data: ", data);

            // we want to pull apart the 'dt_txt'

            // how do we convert a STRING to ARRAY and ARRAY to STRING
            let test = "Hello There Friend";
            let result = test.split(" ")  // ["Hello", "Theree", "Friende"]
            let last = result[result.length - 1];

            // ARRAY.join();
        })
        .catch(error => {
            console.log(error);
        });
}


