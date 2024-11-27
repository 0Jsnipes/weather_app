import React, { useEffect } from 'react';
import gsap from 'gsap';

const WeatherDisplay = ({ weatherData }) => {
  useEffect(() => {
    gsap.fromTo(
      '.weather-display',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, [weatherData]);

  return (
    <div className="weather-display">
      <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
      <p>{weatherData.current.condition.text}</p>
      <img src={weatherData.current.condition.icon} alt="weather-icon" />
      <p>{weatherData.current.temp_c}°C</p>
    </div>
  );
};

export default WeatherDisplay;
