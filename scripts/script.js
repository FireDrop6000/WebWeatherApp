const apiKey = "290c1c1e53a66cf34935d8825cfbbdaf";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name + "📍";
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°";
    document.querySelector(".desc").innerHTML = data.weather[0].description
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML =
      Math.round(data.wind.speed) + " km/h";

    var weatherCode = data.weather[0].id;
    var weatherName = data.weather[0].main;
    if (weatherName == "Clear") {
      weatherIcon.src = "images/clear.svg";
    } else if (weatherName == "Clouds") {
      if (weatherCode == 801) {
        weatherIcon.src = "images/partly-cloudy.svg";
      } else if (weatherCode == 802) {
        weatherIcon.src = "images/clouds.svg";
      } else {
        weatherIcon.src = "images/overcast.svg";
      }
    } else if (weatherName == "Mist") {
      weatherIcon.src = "images/mist.svg";
    } else if (weatherName == "Smoke" || weatherName == "Ash") {
      weatherIcon.src = "images/smoke.svg";
    } else if (weatherName == "Haze") {
      weatherIcon.src = "images/haze.svg";
    } else if (weatherName == "Dust" || weatherName == "Sand") {
      weatherIcon.src = "images/dust.svg";
    } else if (weatherName == "Fog") {
      weatherIcon.src = "images/foggy.svg";
    } else if (weatherName == "Squall" || weatherName == "Wind") {
      weatherIcon.src = "images/windy.svg";
    } else if (weatherName == "Tornado") {
      weatherIcon.src = "images/tornado.svg";
    } else if (weatherName == "Snow") {
      weatherIcon.src = "images/snow.svg";
    } else if (weatherName == "Rain") {
      weatherIcon.src = "images/rain.svg";
    } else if (weatherName == "Drizzle") {
      weatherIcon.src = "images/drizzle.svg";
    } else if (weatherName == "Thunderstorm") {
      if (weatherCode == 211) {
        weatherIcon.src = "images/thunder.svg";
      } else {
        weatherIcon.src = "images/thunderstorm.svg";
      }
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
