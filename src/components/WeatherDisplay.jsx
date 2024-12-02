import React, { useState, useEffect } from 'react';
import gsap from 'gsap';

const WeatherDisplay = ({ weatherData }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    gsap.fromTo(
      '.weather-display',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, [weatherData]);

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const temperature = isCelsius
    ? `${weatherData.current.temp_c}°C`
    : `${weatherData.current.temp_f}°F`;

  return (
    <div className="weather-display">
      <h2>
        {weatherData.location.name}, {weatherData.location.country}
      </h2>
      <p>{weatherData.current.condition.text}</p>
      <img src={weatherData.current.condition.icon} alt="weather-icon" />
      <p className="temperature">{temperature}</p>
      <button onClick={toggleUnit}>
        Show in {isCelsius ? 'Fahrenheit' : 'Celsius'}
      </button>
    </div>
  );
};

export default WeatherDisplay;
