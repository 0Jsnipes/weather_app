import React, { useState, useEffect } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import WeatherDisplay from './components/WeatherDisplay';
import LocationInput from './components/LocationInput';

const API_KEY = '4adb3ceb05dc49deaba173729242711';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  // Fetch weather data
  const fetchWeather = async (query) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}`
      );
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch weather. Please try again.');
    }
  };

  // Detect user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(`${latitude},${longitude}`);
        },
        () => setError('Location permission denied. Enter location manually.')
      );
    } else {
      setError('Geolocation not supported. Enter location manually.');
    }
  }, []);

  const getBackgroundAnimation = () => {
    if (!weatherData) return '';
    const condition = weatherData.current.condition.text.toLowerCase();
    const animations = {
      sunny: 'background-animation-sunny',
      rainy: 'background-animation-rainy',
      cloudy: 'background-animation-cloudy',
      clear: 'background-animation-clear',
      snowy: 'background-animation-snowy',
      thunderstorm: 'background-animation-thunderstorm',
      mist: 'background-animation-misty',
      windy: 'background-animation-windy',
      fog: 'background-animation-foggy',
      overcast: 'background-animation-overcast',
      haze: 'background-animation-hazy',
      drizzle: 'background-animation-drizzle',
      'partly cloudy': 'background-animation-partly-cloudy',
      hot: 'background-animation-hot',
      cold: 'background-animation-cold',
    };

    // Return the corresponding animation or a default
    return animations[condition] || 'background-animation-clear';
  };

  return (
    <div className={`app ${getBackgroundAnimation()}`}>
      <h1>Weather App</h1>
      <LocationInput setLocation={setLocation} fetchWeather={fetchWeather} />
      {error && <p className="error">{error}</p>}
      {weatherData && <WeatherDisplay weatherData={weatherData} />}
    </div>
  );
}

export default App;
