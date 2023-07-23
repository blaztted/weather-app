// DOM MOdule Pattern
const domManip = (() => {
  const searchButton = document.querySelector('.search-button');
  const clearButton = document.querySelector('.reset-button');
  searchButton.addEventListener('click', fetchCurrentWeather);
  clearButton.addEventListener('click', clearSearch);
})();

// Async function to fetch current forecast from user input on form
async function fetchCurrentWeather() {
  try {
    const searchCountry = document.getElementById('search-country').value;
    const searchCity = document.getElementById('search-city').value;
    console.log(searchCountry);
    console.log(searchCity);
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchCountry + "," + searchCity + "&units=metric&APPID=9270b2bf465fdbbaeec9cec7447a23bd", {mode : "cors" });
    const currentData = await response.json();
    console.log('Fetching current weather data from API...', currentData);
  } catch (err) {
    console.log('Something went wrong with fetching the current weather data...', err);
  }
}

function clearSearch() {
  document.getElementById('search-country').value = '';
  document.getElementById('search-city').value = '';
}