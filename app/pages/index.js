import { useState } from 'react';
import WeatherForm from '../components/WeatherForm';
import WeatherCard from '../components/WeatherCard';
import axios from 'axios';

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(`/api/weather?city=${city}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="container">
      <h1>Weather Analysis</h1>
      <WeatherForm onSearch={fetchWeather} />
      <WeatherCard data={weatherData} />
    </div>
  );
}
