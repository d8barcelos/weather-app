const apiKey = "50cab9dfd02f2a69e13d48bb51d5308b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".display").style.display = "none";
        } else {
            var data = await response.json();

            console.log(data);

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            if (data.weather[0].main == "Clouds") {
                weathericon.src = "images/clouds.png";
            } else if (data.weather[0].main == "Clear") {
                weathericon.src = "images/clear.png";
            } else if (data.weather[0].main == "Rain") {
                weathericon.src = "images/rain.png";
            } else if (data.weather[0].main == "Drizzle") {
                weathericon.src = "images/drizzle.png";
            } else if (data.weather[0].main == "Mist") {
                weathericon.src = "images/mist.png";
            }
        }

        document.querySelector(".weather").style.display = "block";

    } catch (error) {
        console.log(error);
    }
}

function handleSearch() {
    const city = searchBox.value;
    if (city.trim() !== "") {
        checkWeather(city);
    }
}

searchBtn.addEventListener("click", handleSearch);

searchBox.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});
