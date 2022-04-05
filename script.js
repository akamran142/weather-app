// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// create weatherApi Object to store weather key and base url

const weatherApi = {
  key: "bb6512260c3ecff86ecbec4337bc2977",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

// get all required Elements from document
const search_input = document.getElementById("search-input"); //search input box
const city = document.querySelector(".cityName"); //city name
const temp = document.querySelector(".temp"); //temperature
const min_max = document.querySelector(".min-max"); //min / max
const weatherType = document.querySelector(".weather"); //weather type
const weatherBox = document.querySelector(".app-main"); //get weather box to add bg color when we hit city name
const weatherBody = document.querySelector(".weather-body"); //get weather body to show weather info when hit enter.
const curruntDate = document.querySelector(".date"); //get date
//get image div
// const image = document.querySelector(".weather-status .icon");
//Event listner function on key press
search_input.addEventListener("keypress", (event) => {
  //get city name
  if (event.key == "Enter") {
    getWeatherReport(search_input.value); //pass city name to get weather
    weatherBox.style.backgroundColor = "#151e3c";
    weatherBody.style.display = "block";
  }
});

// get weather Report function
function getWeatherReport(city) {
  //get weather data from Api
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then((weather) => {
      return weather.json(); //convert weather into json formate
    })
    .then(showWeatherReport); //pass json formate  from showWeatherReport function
}

//Show weather report on ui
function showWeatherReport(weather) {
  city.textContent = `${weather.name}, ${weather.sys.country} `; //Change city name
  temp.textContent = `${Math.round(weather.main.temp)}\u00B0C`; // change temperature
  //store min and max temperature
  min_max.textContent = `${Math.floor(
    weather.main.temp_min
  )}\u00B0C (min) / ${Math.ceil(weather.main.temp_max)}\u00B0C (max)`;
  //change weather type
  weatherType.textContent = `${weather.weather[0].main}`;
  //   change background according to weather
  if (weatherType.textContent == "Clear") {
    document.body.style.backgroundImage = 'url("images/Clear.jpg")';
    // image.innerHTML = `<i class="fa-solid fa-sun-cloud"></i>`;
  } else if (weatherType.textContent == "Clouds") {
    document.body.style.backgroundImage = 'url("images/Cloudy.jpg")';
  } else if (weatherType.textContent == "Rainy") {
    document.body.style.backgroundImage = 'url("images/Rain.jpg")';
  } else if (
    weatherType.textContent == "Smoke" ||
    weatherType.textContent == "Haze"
  ) {
    document.body.style.backgroundImage = 'url("images/smoke.jpg")';
  } else if (weatherType.textContent == "Stormy") {
    document.body.style.backgroundImage = 'url("images/storm.jpg")';
  } else if (weatherType.textContent == "Windy") {
    document.body.style.backgroundImage = 'url("images/Wind.jpg")';
  } else if (weatherType.textContent == "Snow") {
    document.body.style.backgroundImage = 'url("images/snow.jpg")';
  }

  let todaydate = new Date(); //this built-in date  function will return full date with time ,year,month and day
  //call dateManage function to show date formate we want and store it into date variable
  curruntDate.textContent = dateManage(todaydate);
}

//Date manage
function dateManage(getDate) {
  //make days array
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  //make months array
  let months = [
    "January",
    "Fabruary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octuber",
    "November",
    "December",
  ];
  let year = getDate.getFullYear(); //get currunt year
  let month = months[getDate.getMonth()]; //get currunt month
  let date = getDate.getDate(); // get currunt date
  let day = days[getDate.getDay()]; // get curunt day

  return `${date} ${month} (${day}), ${year}`; //return display formate
}
