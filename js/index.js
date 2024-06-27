// search bar

const searchLocation = document.getElementById("searchLocation");
const searchButton = document.getElementById("searchButton");
const day = document.getElementById("day");
const datas = document.getElementById("datas");
const cities = document.getElementById("cities");
const desc = document.getElementById("desc");
const humidity = document.getElementById("humidity");
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
    cities.innerHTML = obj.location.name;
    document.getElementById("temp").innerHTML = obj.current.temp_c + "°C";
    const URL =  `https:` + obj.current.condition.icon
    document.getElementById("forecastIcon").setAttribute("src",URL)
    document.getElementById("weatherDesc").innerHTML = obj.current.condition.text
    humidity.innerHTML = obj.current.humidity + "%"
    document.getElementById("wind").innerHTML = obj.current.wind_kph + "km/h"
    document.getElementById("country").innerHTML = obj.location.country


    // day2
    document.getElementById("temp1").innerHTML = obj.forecast.forecastday[1].day.avgtemp_c+ "°C";
    const URL2=`https:`+obj.forecast.forecastday[1].day.condition.icon
    document.getElementById("forecastIcon2").setAttribute("src",URL2)
//day3
document.getElementById("temp2").innerHTML = obj.forecast.forecastday[2].day.avgtemp_c+ "°C";
const URL3=`https:`+obj.forecast.forecastday[2].day.condition.icon
    document.getElementById("forecastIcon3").setAttribute("src",URL3)


}

searchButton.addEventListener("click", function () {
    checkWeather(searchLocation.value);
})

async function days() {
 let geolocation = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=93f4f23d5f5f4f9b9fa192129241406&q=london&days=3`)
 var dataa = await geolocation.json();
    var obje = { ...dataa }
 console.log(obje)
 }
 days()

