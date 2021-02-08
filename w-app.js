//Select elements
const locat = document.querySelector(".location");
const date = document.querySelector(".date");
const temp = document.querySelector(".temperature-value");
const desc = document.querySelector(".description");
const notif = document.querySelector(".notification");
const weatherIcon = document.querySelector(".weather-icon");

//App data
const api_base = "https://api.openweathermap.org/data/2.5/";
const key = "e456b8f4cb355399e3de83c14a632a93";

const weather = {
  temperature: {
    unit: "celsius",
  },
};

//Checks browser support for geolocation
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notif.style.display = "block";
  notif.innerHTML = `<p> Browser does not support Geolocation</p>`;
}

//Functions
//setting user's position
function setPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  getWeather(lat, lon);
}

function showError(error) {
  notif.style.display = "block";
  notif.innerHTML = `<p>${error.message}</p>`;
}

function getWeather(lat, lon) {
  const api = `${api_base}weather?lat=${lat}&lon=${lon}&appid=${key}`;
  console.log(api);

  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      saveData(data);
    })
    .then(() => {
      displayWeather();
    });
}

function saveData(data) {
  weather.temperature.value = Math.floor(data.main.temp - 273);

  weather.description = data.weather[0].description;

  weather.city = data.name;

  weather.country = data.sys.country;

  weather.iconId = data.weather[0].icon;
}

displayWeather = () => {
  temp.innerHTML = `${weather.temperature.value}<span>°C</span>`;
  desc.innerHTML = `${weather.description}`;
  locat.innerHTML = `${weather.city}, ${weather.country}`;
  weatherIcon.innerHTML = `<img src=icons/${weather.iconId}.png />`;
};

//Getting weather of searched location
const searchLocation = document.querySelector(".searchBox");
searchLocation.addEventListener("keypress", setQuery);

function setQuery(evt) {
  //if the enter key(13) is pressed
  if (evt.keyCode == 13) {
    getResults(searchLocation.value);
  }
}

function getResults(query) {
  fetch(`${api_base}weather?q=${query}&appid=${key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(function (data) {
      saveData(data);
    })
    .then(() => {
      displayWeather();
    })
    .then(() => {
      searchLocation.value = "";
    });
}
