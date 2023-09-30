let now = new Date();
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
// Check if minutes is a single digit, and add a leading zero if needed
minutes = minutes < 10 ? `0${minutes}` : minutes.toString();
hours = hours < 10 ? `0${hours}` : hours.toString();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let h2 = document.querySelector("h2");
h2.innerHTML = `${day}  ${hours}: ${minutes}`;

function diplayWeatherCondition(response) {
  //console.log(response.data.name);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function search(event) {
  event.preventDefault();
  //let cityElement = document.querySelector("#city");
  //let cityInput = document.querySelector("#city-input");
  //cityElement.innerHTML = cityInput.value;
  let apiKey = "513ab3bd0c19325a72d631c612752bba";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(diplayWeatherCondition);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let temperature = 66; // Default temperature in Fahrenheit
let isFahrenheit = true;

const temperatureElement = document.getElementById("temperature");
const farenToggleElement = document.getElementById("deg-farenheight");
const celciusToggleElement = document.getElementById("deg-celcius");
const toggleButton = document.getElementById("toggle-button");
farenToggleElement.classList.add("highlighted");

// Function to update the temperature display
function updateTemperature() {
  if (isFahrenheit) {
    temperatureElement.textContent = temperature;
  } else {
    // Convert Fahrenheit to Celsius
    const celsiusTemperature = ((temperature - 32) * 5) / 9;
    temperatureElement.textContent = celsiusTemperature.toFixed(0);
  }
}

function showCity(position) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = ` ${position.coords.latitude} and your longitude is 
        ${position.coords.longitude} `;
  //console.log(position.coords.latitude);
  //console.log(position.coords.longitude);

  //let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q={city name}&appid={513ab3bd0c19325a72d631c612752bba}`;
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCity);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

// Toggle Farenheight click event
farenToggleElement.addEventListener("click", function (e) {
  e.stopPropagation();
  isFahrenheit = true; // Toggle between Fahrenheit and Celsius
  celciusToggleElement.classList.remove("highlighted");
  farenToggleElement.classList.add("highlighted");
  updateTemperature();
});

// Toggle Celcius click event
celciusToggleElement.addEventListener("click", function (e) {
  e.stopPropagation();
  isFahrenheit = false; // Toggle between Fahrenheit and Celsius
  celciusToggleElement.classList.add("highlighted");
  farenToggleElement.classList.remove("highlighted");
  updateTemperature();
});
// Initial update
updateTemperature();
