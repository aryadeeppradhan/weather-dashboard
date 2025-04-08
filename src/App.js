import React, { useState } from 'react';
import './App.css';
function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const apiKey = '1dd4a6b2d52296c07031093361951f4d'; // Replace this later with your real key

  const getWeather = async () => {
    if (!city) return;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert("City not found!");
        setWeather(null);
      }
    } catch (error) {
      alert("Error fetching weather data");
    }
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
  
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].main}</p>
          <p>{weather.main.temp} °C</p>
        </div>
      )}
    </div>
  );
} 


export default App;
