"use client";

import { useState } from 'react';

export default function WeatherForm({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className="weather-form">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="input"
      />
      <button type="submit" className="button">Search</button>
    </form>
  );
}
