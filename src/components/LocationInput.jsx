import React, { useState } from 'react';

const LocationInput = ({ setLocation, fetchWeather }) => {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    if (input) {
      setLocation(input);
      fetchWeather(input);
    }
  };

  return (
    <div className="location-input">
      <input
        type="text"
        placeholder="Enter location"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default LocationInput;
