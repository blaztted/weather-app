// DOM MOdule Pattern
const domManip = (() => {
  const searchButton = document.querySelector('.search-button');
  const clearButton = document.querySelector('.reset-button');
  searchButton.addEventListener('click', fetchCurrentWeather);
  clearButton.addEventListener('click', clearSearch);
})();

// Async function to fetch current forecast from user input on form
async function fetchCurrentWeather(searchCountry, searchCity) {
  try {
    const searchCountry = document.getElementById('search-country').value;
    const searchCity = document.getElementById('search-city').value;

    // Run check to ensure all fields have values
    if (searchCountry == '' || searchCity == '') {
      alert('All fields are required. Please try again!');
      return;
    }

    console.log(searchCountry);
    console.log(searchCity);

    // Run fetch and wait for response JSON
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchCountry + "," + searchCity + "&units=metric&APPID=9270b2bf465fdbbaeec9cec7447a23bd", {mode : "cors" });
    const currentData = await response.json();
    console.log('Fetching current weather data from API...', currentData);

    // Construct object for weather app from API JSON data
    const currentWeather = {
      mainWeather: currentData.weather[0].main,
      place: currentData.name + ', ' + currentData.sys.country,
      description: currentData.weather[0].description.replace(/\b\w/g, letter => (letter.toUpperCase())),
      temp: Math.round(currentData.main.temp) + 'ºC',
      humidity: currentData.main.humidity + '%',
      wind: Math.round(currentData.wind.speed) + 'km/h'

    };
    console.log(currentWeather);
  } catch (err) {
    console.log('Something went wrong with fetching the current weather data...', err);
  }
}

function clearSearch() {
  document.getElementById('search-country').value = '';
  document.getElementById('search-city').value = '';
}