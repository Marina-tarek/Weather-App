// ====== Global Scoop ===>
const searchLocation = document.getElementById("searchLocation");
const searchButton = document.getElementById("searchButton");

// =====>to do deafult location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function (position) {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        let appApiKey = `f8ad15983f193fc0757393639ddc7517`
        let liveLocation = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${appApiKey}`)
        main = await liveLocation.json();
        cityNameDefult = { ...main }[0].name
        //   console.log(cityNameDefult)
        checkWeather(cityNameDefult)
        anotherDays(cityNameDefult);
    }, function (error) {
        window.alert("must allow location access")
        console.log(error)
    })
}

// ====>to stop deafult in Form
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
})

// ====>two ways find weather by location 
// ==>first way
searchLocation.addEventListener("input", function () {
    try {
        if (searchLocation.value == "") throw "is empty"
        if (!isNaN(searchLocation.value)) throw "is not a character";
        else {
            checkWeather(searchLocation.value);
            anotherDays(searchLocation.value);
        }
    }
    catch (err) {
        document.getElementById("msg").innerHTML = "Input " + err;
    }

})
// ==>second way
searchButton.addEventListener("click", function () {
    try {
        if (searchLocation.value == "") throw "is empty"
        if (!isNaN(searchLocation.value)) throw "is not a character";
        else {
            api(city)
            checkWeather(searchLocation.value);
            anotherDays(searchLocation.value);
        }
    }
    catch (err) {
        document.getElementById("msg").innerHTML = "Input " + err;
    }
})

// ========>Api from Weather Api  to get information about location
const apiKey = " 93f4f23d5f5f4f9b9fa192129241406";
const apiURL = `https://api.weatherapi.com/v1/forecast.json?&days=3`
let response;
let data;
let obj;
async function api(city) {
    response = await fetch(apiURL + `&q=${city}` + `&key=${apiKey}`)
    data = await response.json();
    obj = { ...data }
    // console.log(obj)
}


// ========>information about city weather  in first day 
async function checkWeather(city) {
    await api(city)

    const date1 = new Date(obj.forecast.forecastday[0].date)
    document.getElementById("date").innerHTML = date1.toDateString().slice(4, 11)
    document.getElementById("day").innerHTML = date1.toDateString().slice(0, 3)
    document.getElementById("Location").innerHTML = obj.location.name;
    document.getElementById("temp").innerHTML = obj.current.temp_c + "°C";
    const URL = `https:` + obj.current.condition.icon
    document.getElementById("forecastIcon").setAttribute("src", URL)
    document.getElementById("weatherDesc").innerHTML = obj.current.condition.text
    document.getElementById("humidity").innerHTML = obj.current.humidity + "%"
    document.getElementById("wind").innerHTML = obj.current.wind_kph + "km/h"
    document.getElementById("country").innerHTML = obj.location.country

}


// ========>information about city weather  in second day and third day
async function anotherDays(city) {
    await api(city)
    // => day2
    const date2 = new Date(obj.forecast.forecastday[1].date)
    document.getElementById("day2").innerHTML = date2.toDateString().slice(0, 3)
    document.getElementById("weatherDesc1").innerHTML = obj.forecast.forecastday[1].day.condition.text;
    document.getElementById("temp1").innerHTML = obj.forecast.forecastday[1].day.avgtemp_c + "°C";
    document.getElementById("smallDegree1").innerHTML = obj.forecast.forecastday[1].day.mintemp_c + "°C";
    const URL2 = `https:` + obj.forecast.forecastday[1].day.condition.icon
    document.getElementById("forecastIcon2").setAttribute("src", URL2)
    //=> day3
    const date3 = new Date(obj.forecast.forecastday[2].date)
    document.getElementById("day3").innerHTML = date3.toDateString().slice(0, 3)
    document.getElementById("weatherDesc2").innerHTML = obj.forecast.forecastday[2].day.condition.text;
    document.getElementById("temp2").innerHTML = obj.forecast.forecastday[2].day.avgtemp_c + "°C";
    document.getElementById("smallDegree2").innerHTML = obj.forecast.forecastday[2].day.mintemp_c + "°C";
    const URL3 = `https:` + obj.forecast.forecastday[2].day.condition.icon
    document.getElementById("forecastIcon3").setAttribute("src", URL3)

}

