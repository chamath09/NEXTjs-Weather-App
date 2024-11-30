"use client";

import { useState } from "react";
import { WiDaySunny, WiRain, WiCloudy } from "react-icons/wi"; 
import axios from "axios";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_WEATHER_API_URL}?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Weather Analysis</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <WeatherForm onSearch={fetchWeather} />
        {weatherData && <WeatherCard data={weatherData} />}
      </div>
    </div>
  );
}

function WeatherForm({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
}

function WeatherCard({ data }) {
  const weatherIcon =
    data.weather[0].main === "Rain" ? (
      <WiRain size={64} />
    ) : data.weather[0].main === "Clouds" ? (
      <WiCloudy size={64} />
    ) : (
      <WiDaySunny size={64} />
    );

  return (
    <div className="mt-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{data.name}</h2>
          <p>{data.weather[0].description}</p>
        </div>
        {weatherIcon}
      </div>
      <div className="flex justify-between mt-4">
        <div>
          <h3 className="text-xl font-bold">{Math.round(data.main.temp)}°C</h3>
          <p>Feels like: {Math.round(data.main.feels_like)}°C</p>
        </div>
        <div className="text-right">
          <p>Humidity: {data.main.humidity}%</p>
          <p>Wind: {data.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
}
