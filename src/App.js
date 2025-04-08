import React, { useState } from 'react';
import './App.css';
function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [fontColor, setFontColor] = useState('black');
  const [isNight, setIsNight] = useState(false);

  const [bgClass, setBgClass] = useState('default');//background change krne k liye
  const apiKey = '1dd4a6b2d52296c07031093361951f4d'; 

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    setWeather(null);
    setForecast([]);
    setHistory(prev => {
      const updated = [city, ...prev.filter(c => c.toLowerCase() !== city.toLowerCase())];
      return updated.slice(0, 5);
    });
    
    try {
      const apiKey = "1dd4a6b2d52296c07031093361951f4d";
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();

    if (res.ok) {
      setWeather(data);
      const isNightTime = data.dt < data.sys.sunrise || data.dt > data.sys.sunset;
      setIsNight(isNightTime);
      setFontColor(isNightTime ? 'white' : 'black');
      const condition = data.weather[0].main.toLowerCase();

let bg = "";

if (isNightTime) {
  if (condition.includes("clear")) bg = "night-clear";
  else if (condition.includes("cloud")) bg = "night-cloudy";
  else if (condition.includes("rain")) bg = "night-rain";
  else bg = "night-default";
} else {
  if (condition.includes("clear")) bg = "day-clear";
  else if (condition.includes("cloud")) bg = "day-cloudy";
  else if (condition.includes("rain")) bg = "day-rain";
  else bg = "day-default";
}

setBgClass(bg);
setIsNight(isNightTime);
      // const condition = data.weather[0].main.toLowerCase();
      // if (condition.includes("cloud")) setBgClass("cloudy");
      // else if (condition.includes("rain")) setBgClass("rainy");
      // else if (condition.includes("clear")) setBgClass("sunny");
      // else if (condition.includes("snow")) setBgClass("snowy");
      // else setBgClass("default");
    } else {
      setError("Sorry, city not found");
    }
  } catch (err) {
    setError("Failed to fetch weather data. Please check your connection ☁️");
  }
  const forecastRes = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  );
  const forecastData = await forecastRes.json();

  if (forecastRes.ok) {
    const dailyForecasts = forecastData.list.filter((item, index) => index % 8 === 0);
    setForecast(dailyForecasts);
  } else {
    console.warn("Forecast fetch failed");
  }

  setLoading(false);
};
  

  return (
    // <div className={`app-container ${bgClass} ${fontColor === 'white' ? 'text-white' : 'text-black'}`}>
    <div className={`app-container ${bgClass}`}>
      <div className={`top-section ${isNight ? 'night-text' : ''}`}>
      <h1 className="title">Weather Dashboard </h1>
      <form onSubmit={(e) => { e.preventDefault(); getWeather(); }}>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="search-bar"
      />
      <button onClick={getWeather} className="weather-button">Get Weather</button>
      </form>
      {loading && <p>Loading weather data...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {history.length > 0 && (
  <div className="history">
    <h3>Recent Searches</h3>
    <ul>
      {history.map((c, index) => (
        <li key={index} onClick={() => setCity(c)}>{c}</li>
      ))}
    </ul>
  </div>
)}
{weather && (
  <p style={{ fontSize: "18px", marginTop: "10px" }}>
    {isNight ? "🌙 It's night time" : "☀️ It's day time"} in <strong>{weather.name}</strong>
  </p>
)}
</div>
      {weather && weather.main && ( 
  <div className="weather-card">
    <h2>{weather.name}</h2>
    <img
      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      alt="Weather Icon"
    />
    <p><strong>Condition:</strong> {weather.weather[0].main}</p>
    <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
    <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> {weather.wind.speed} km/h</p>
  </div>
)}
{forecast.length > 0 && (
  <div className="forecast">
    <h3>5-Day Forecast</h3>
    <div className="forecast-grid">
      {forecast.map((item, index) => (
        <div key={index} className="forecast-day">
          <p><strong>{item.dt_txt.split(' ')[0]}</strong></p>
          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt="icon"
          />
          <p>{item.weather[0].main}</p>
          <p>{item.main.temp} °C</p>
        </div>
      ))}
    </div>
  </div>
)}


    </div>
  );
} 


export default App;
