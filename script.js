const weatherDiv = document.getElementById('weather');
const updateBtn = document.getElementById('updateBtn');
const API_KEY = '6ea87864f13a05ecefde134a47d896fa'; 
const CITY = 'Kyiv';
const UNIT = 'metric'; 

async function fetchWeather() {
  weatherDiv.textContent = 'Loading...';
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=${UNIT}&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherDiv.textContent = 'Error loading weather data';
    console.error(error);
  }
}

function displayWeather(data) {
  const temp = data.main.temp;
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  weatherDiv.innerHTML = `
    <p>City: ${CITY}</p>
    <p>Temperature: ${temp}°C</p>
    <p>Condition: ${description}</p>
    <p>Humidity: ${humidity}%</p>
  `;
}

// Виклик при завантаженні
fetchWeather();

// Кнопка оновлення
updateBtn.addEventListener('click', fetchWeather);
