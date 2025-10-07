const weatherDiv = document.getElementById('weather');
const updateBtn = document.getElementById('updateBtn');

const API_KEY = '6ea87864f13a05ecefde134a47d896fa'; 
const CITY = 'Kyiv,UA';
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
  const feelsLike = data.main.feels_like;
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const pressure = data.main.pressure;

  const now = new Date();
  const dateStr = now.toLocaleDateString('uk-UA');
  const timeStr = now.toLocaleTimeString('uk-UA');

  weatherDiv.innerHTML = `
    <div class="weather-row"><span>City:</span> <span>${CITY}</span></div>
    <div class="weather-row"><span>Temperature:</span> <span>${temp}°C</span></div>
    <div class="weather-row"><span>Feels like:</span> <span>${feelsLike}°C</span></div>
    <div class="weather-row"><span>Condition:</span> <span>${description}</span></div>
    <div class="weather-row"><span>Humidity:</span> <span>${humidity}%</span></div>
    <div class="weather-row"><span>Wind Speed:</span> <span>${windSpeed} m/s</span></div>
    <div class="weather-row"><span>Pressure:</span> <span>${pressure} hPa</span></div>
    <div class="weather-row"><span>Date:</span> <span>${dateStr}</span></div>
    <div class="weather-row"><span>Time:</span> <span>${timeStr}</span></div>
  `;
}

// Виклик при завантаженні сторінки
fetchWeather();

// Кнопка оновлення
updateBtn.addEventListener('click', fetchWeather);
