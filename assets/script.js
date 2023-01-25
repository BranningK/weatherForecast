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
      });
}


