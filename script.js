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
  const icon = data.weather[0].icon;

  const now = new Date();
  const dateStr = now.toLocaleDateString('uk-UA');
  const timeStr = now.toLocaleTimeString('uk-UA');

  weatherDiv.innerHTML = `
    <div class="main-info">${temp}°C</div>
    <div class="icon"><img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon"></div>
    <div class="sub-info">${description}</div>
    <div class="sub-info">Feels like: ${feelsLike}°C</div>
    <div class="sub-info">Humidity: ${humidity}%</div>
    <div class="sub-info">Wind: ${windSpeed} m/s</div>
    <div class="sub-info">Pressure: ${pressure} hPa</div>
    <div class="sub-info">Date: ${dateStr}</div>
    <div class="sub-info">Time: ${timeStr}</div>
  `;
}

// Виклик при завантаженні сторінки
fetchWeather();

// Кнопка оновлення
updateBtn.addEventListener('click', fetchWeather);
