const searchLocation = document.getElementById("searchLocation");
const searchButton = document.getElementById("searchButton");
const day = document.getElementById("day");
const cities = document.getElementById("cities");
const desc = document.getElementById("desc");
const formInput = document.querySelector('form')

formInput.addEventListener('submit', function (e) {
    e.preventDefault();
})


const apiKey = " 93f4f23d5f5f4f9b9fa192129241406";
const apiURL = `https://api.weatherapi.com/v1/forecast.json?&days=3`

async function checkWeather(city) {

    let response = await fetch(apiURL + `&q=${city}` + `&key=${apiKey}`)
    var data = await response.json();
    var obj = { ...data }
    console.log(obj)
    const datee = new Date(obj.forecast.forecastday[0].date)
    document.getElementById("date").innerHTML = datee
    cities.innerHTML = obj.location.name;
    document.getElementById("temp").innerHTML = obj.current.temp_c + "°C";
    const URL = `https:` + obj.current.condition.icon
    document.getElementById("forecastIcon").setAttribute("src", URL)
    document.getElementById("weatherDesc").innerHTML = obj.current.condition.text
    document.getElementById("humidity").innerHTML = obj.current.humidity + "%"
    document.getElementById("wind").innerHTML = obj.current.wind_kph + "km/h"
    document.getElementById("country").innerHTML = obj.location.country

    // day2

    document.getElementById("weatherDesc1").innerHTML = obj.forecast.forecastday[1].day.condition.text;
    document.getElementById("temp1").innerHTML = obj.forecast.forecastday[1].day.avgtemp_c + "°C";
    document.getElementById("smallDegree1").innerHTML = obj.forecast.forecastday[1].day.mintemp_c + "°C";
    const URL2 = `https:` + obj.forecast.forecastday[1].day.condition.icon
    document.getElementById("forecastIcon2").setAttribute("src", URL2)
    //day3
    document.getElementById("weatherDesc2").innerHTML = obj.forecast.forecastday[2].day.condition.text;
    document.getElementById("temp2").innerHTML = obj.forecast.forecastday[2].day.avgtemp_c + "°C";
    document.getElementById("smallDegree2").innerHTML = obj.forecast.forecastday[2].day.mintemp_c + "°C";
    const URL3 = `https:` + obj.forecast.forecastday[2].day.condition.icon
    document.getElementById("forecastIcon3").setAttribute("src", URL3)


}

searchLocation.addEventListener("input", function () {

    try {
        if (searchLocation.value == "") throw "is empty"
        if (!isNaN(searchLocation.value)) throw "is not a character";
        else {
            checkWeather(searchLocation.value);
        }
    }
    catch (err) {
        document.getElementById("msg").innerHTML = "Input " + err;
    }

})
searchButton.addEventListener("click", function () {
    try {
        if (searchLocation.value == "") throw "is empty"
        if (!isNaN(searchLocation.value)) throw "is not a character";
        else {
            checkWeather(searchLocation.value);
        }
    }
    catch (err) {
        document.getElementById("msg").innerHTML = "Input " + err;
    }

})

async function anotherDays(){
var kae={...data}
console.log(kae)
}
