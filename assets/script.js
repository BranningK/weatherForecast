let cityName = $('#cityName');
let cityTitle = $('#cityTitle');
let currentDate = $('#currentDate');
let currentTemp = $('#currentTemp');
let icon = $('#weatherIcon');
let wind = $('#windSpeed');
let humidity = $('#humidity');
let boxDate = $('#boxDate');
const APIkey = "6263ccfbb1c32f882fe28992cf9e4cdd"

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
    // https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
    credentials: 'same-origin',
    redirect: 'follow',
})
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log('Here is data: ', data);
        var location = data.name;
        console.log('City name:', location);
        var lowTemp = Math.round(data.main.temp_min);
        console.log('Low: ', lowTemp);
        var currTemp = Math.round(data.main.temp);
        console.log('Current temp:', currTemp);
        var highTemp = data.main.temp_max;
        console.log('High:', Math.round(highTemp));
        var weatherConditions = data.weather[0].description;
        console.log('Current conditions:', weatherConditions);
        var windSpeed = Math.round(data.wind.speed);
        console.log('Wind speed:', windSpeed);
        var windDir = data.wind.deg;
        console.log('Wind direction(degrees):', windDir);
            // Function that turns raw degrees into cardinal directions
            function degToCompass(num) {
                var val = Math.floor((num / 22.5) + 0.5);
                var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
                return arr[(val % 16)];
            };
        console.log('Wind direction (cardinal): ', degToCompass(windDir));
        var hum = data.main.humidity;
        console.log('Humidity', hum, '%');
        var weatherImage = data.weather[0].icon;

        cityTitle[0].textContent = location;
        currentTemp[0].textContent = ('Temp: ' + currTemp + '°F');
        currentDate[0].textContent = dayjs().format('ddd MM/DD/YYYY');
        wind[0].textContent = ('Wind Speed: ' + windSpeed + ' MPH ' + degToCompass(windDir));
        humidity[0].textContent = ('Humidity: ' + hum + '%');
        icon.append(`<img src= http://openweathermap.org/img/wn/${weatherImage}@2x.png></img>`);
        console.log(`http://openweathermap.org/img/wn/10n@2x.png`)

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
console.log("======================================");
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`;
    console.log("Forecast URL:", forecastUrl);


    fetch(forecastUrl)
        .then(function(response) {
            console.log('Response:', response);
            return response.json();
        })
        .then(data => {
            console.log("Data: ", data);

            // we want to pull apart the 'dt_txt'

            // data.list[3] = noon the following day
            // data.list[11] = noon two days after
            // data.list[19] = noon 3 days after
            // data.list[27] = noon 4 days after
            // data.lsit[35] = noon 5 days after

            console.log(data.list[3]);
            console.log(data.list[3].dt_txt);
            console.log(data.list[3].main.temp);

            var dtTXT = data.list[3].dt_txt; 

            console.log(dtTXT.split(' '));

            var dtText = dtTXT.split(' ');

            var dateText = dtText[0].split('-');
            console.log(dateText);

            boxDate[0].textContent = (dateText[1] + '/' + dateText[2] +'/' + dateText[0])

            // <div class="d-flex flex-row m-3 mx-2 container-fluid">
            // <div class="bg-primary-subtle pb-4 card me-4">
            //     <h5 class="text-center">1/24/2023</h5>
            //     <div class="bg-light text-dark p-3">
            //         <i class="fa-solid fa-cloud fa-2x"></i>
            //         <p class="fs-4">Temp: 77 F</p>
            //         <p class="fs-6">Wind: 5 MPH SW</p>
            //         <p class="fs-6">Humidity: 30%</p>
            //     </div>
            // </div>

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


