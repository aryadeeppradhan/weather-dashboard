import React, { useState } from 'react';
import './App.css';
function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const apiKey = '1dd4a6b2d52296c07031093361951f4d'; // Replace this later with your real key

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    setWeather(null);
  
    try {
      const apiKey = "1dd4a6b2d52296c07031093361951f4d";
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();

    if (res.ok) {
      setWeather(data);
    } else {
      setError("Sorry, city not found ☹️");
    }
  } catch (err) {
    setError("Failed to fetch weather data. Please check your connection ☁️");
  }

  setLoading(false);
};
  

  return (
    <div className="app-container">
      <h1 className="title">Weather Dashboard 🌤️</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="search-bar"
      />
      <button onClick={getWeather} className="weather-button">Get Weather</button>
      {loading && <p>Loading weather data...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
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

    </div>
  );
} 


export default App;
