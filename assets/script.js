var cityName = $('#cityName');
let cityTitle = $('#cityTitle');
let currentDate = $('#currentDate');
let currentTemp = $('#currentTemp');
let icon = $('#weatherIcon');
let wind = $('#windSpeed');
let humidity = $('#humidity');
let boxDate = $('#boxDate');
let boxContainer = $('#boxContainer')
const APIkey = "6263ccfbb1c32f882fe28992cf9e4cdd"
currentDate[0].textContent = dayjs().format('ddd MM/DD/YYYY');
var pageMode = $('#flexSwitchCheckDefault');
var searchButton = $('#searchBtn');
var ran = false;

if(!localStorage.getItem("searchedCities[4]")){
    console.log('Doesnt exist');
}else {
    $('#rec1').click(function(event){
        pageloadRecs()
        event.preventDefault();
    })
}
window.onload = pageload();

function pageload(){
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
    
            // data to make forecast request
            var lat = data.coord.lat;
            var lon = data.coord.lon;
        });
}

    // cityName[0].value = 'Raleigh'
    // getWeatherData(cityName[0].value)


function pageloadRecs(){
    var json = localStorage.getItem('searchedCities');
    // convert data to JavaScript OBJECT type
    var jsArr = JSON.parse(json);

    $('#rec1')[0].textContent = jsArr[0].name;
    $('#rec2')[0].textContent = jsArr[1].name;
    $('#rec3')[0].textContent = jsArr[2].name;
    $('#rec4')[0].textContent = jsArr[3].name;
    $('#rec5')[0].textContent = jsArr[4].name;
}

function saveCity(){
    var searchedCities=[]
     let searchedCity = {
        name: cityName[0].value,
    }
    searchedCities.push(searchedCity);
    searchedCities = searchedCities.concat(JSON.parse(localStorage.getItem('searchedCities') || '[]'));
    console.log(searchedCities);
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
}

$(document).keypress(function(e) {
    if(e.which == 13) {
        if(!ran){
            saveCity();
            getWeatherData();
            ran = true;
        } else{
            return;
        }
    };
});

searchButton.click(function() {
    if(!ran){
        saveCity();
        getWeatherData();
        ran = true;
    } else{
        return;
    }
});

$('#rec1').click(function(event){
    var json = localStorage.getItem('searchedCities');
    var jsArr = JSON.parse(json);
    // jsArr[4].name
    cityName[0].value = jsArr[0].name
    getWeatherData();
    event.preventDefault();
})
$('#rec2').click(function(event){
    var json = localStorage.getItem('searchedCities');
    var jsArr = JSON.parse(json);
    cityName[0].value = jsArr[1].name
    getWeatherData();
    event.preventDefault();
})
$('#rec3').click(function(event){
    var json = localStorage.getItem('searchedCities');
    var jsArr = JSON.parse(json);
    cityName[0].value = jsArr[2].name
    getWeatherData();
    event.preventDefault();
})
$('#rec4').click(function(event){
    var json = localStorage.getItem('searchedCities');
    var jsArr = JSON.parse(json);
    cityName[0].value = jsArr[3].name
    getWeatherData();
    event.preventDefault();
})
$('#rec5').click(function(event){
    var json = localStorage.getItem('searchedCities');
    var jsArr = JSON.parse(json);
    cityName[0].value = jsArr[4].name
    getWeatherData();
    event.preventDefault();
})

function getWeatherData() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName[0].value}&appid=${APIkey}&units=imperial`, {
    method: 'GET',
    // https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
    credentials: 'same-origin',
    redirect: 'follow',
})
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(cityName[0].value);
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

            // data.list[3] = noon the following day
            // data.list[11] = noon two days after
            // data.list[19] = noon 3 days after
            // data.list[27] = noon 4 days after
            // data.lsit[35] = noon 5 days after

            

            console.log(data.list[3]);
            console.log(data.list[3].dt_txt);
            console.log(data.list[3].main.temp);

            var dtTXT = data.list[3].dt_txt;
            var dtText = dtTXT.split(' ');
            var dateText = dtText[0].split('-');

            var temp1 = Math.round(data.list[3].main.temp);

            var date1 = (dateText[1] + '/' + dateText[2] +'/' + dateText[0]);
            var icon1 = $('#icon1');
            var weatherImage1 = data.list[3].weather[0].icon;
            var wind1 = $('#wind1');
            windSpd1 = Math.round(data.list[3].wind.speed);
            hum1 = data.list[3].main.humidity;
            
            for (i = 0; i < 5; i++){
                boxContainer.prepend(   `<div class="darker-blue pb-4 card me-4">
                                            <h5 class="text-center text-light">${date1}</h5>
                                            <div class="bg-primary text-light p-3">
                                                <img id="icon1"  src= http://openweathermap.org/img/wn/${weatherImage1}.png '></img>
                                                <p class="fs-4">${temp1} F</p>
                                                <p id='wind1' class="fs-6">Wind: ${windSpd1} MPH</p>
                                                <p id='hum1' class="fs-6">Humidity: ${hum1}% </p>
                                            </div>
                                        </div>`
                                    );
            }

            icon1.attr(`src=http://openweathermap.org/img/wn/${weatherImage1}@2x.png`);
            console.log(`src= http://openweathermap.org/img/wn/${weatherImage1}@2x.png`)
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

            // // we want to pull apart the 'dt_txt'
            // // how do we convert a STRING to ARRAY and ARRAY to STRING
            // let test = "Hello There Friend";
            // let result = test.split(" ")  // ["Hello", "Theree", "Friende"]
            // let last = result[result.length - 1];

            // ARRAY.join();
        })
        .catch(error => {
            console.log(error);
        });
}


