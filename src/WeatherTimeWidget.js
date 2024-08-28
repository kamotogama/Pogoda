import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Moon, Thermometer } from 'lucide-react';

const WeatherTimeWidget = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState({ type: 'sunny', temp: 13 });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=4fe8d41b43ea4f1fbe2103447242608&q=auto:ip&aqi=no`
        );
        const data = await response.json();
        
        const conditionCode = data.current.condition.code;
        let weatherType = 'sunny';
        
        if (conditionCode === 1000) weatherType = 'sunny';
        else if ([1003, 1006, 1009].includes(conditionCode)) weatherType = 'cloudy';
        else if ([1063, 1180, 1183, 1186, 1189, 1192, 1195].includes(conditionCode)) weatherType = 'rainy';
        else if ([1066, 1114, 1210, 1213, 1216, 1219, 1222, 1225].includes(conditionCode)) weatherType = 'snowy';
        else if ([1087, 1273, 1276, 1279, 1282].includes(conditionCode)) weatherType = 'stormy';
        
        const hour = new Date().getHours();
        if (hour >= 21 || hour < 6) weatherType = 'night';

        setWeather({ 
          type: weatherType, 
          temp: Math.round(data.current.temp_c) 
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
    const weatherInterval = setInterval(fetchWeather, 600000);

    return () => clearInterval(weatherInterval);
  }, []);

  const WeatherIcon = () => {
    const iconProps = { size: 80, className: "text-white animate-pulse" };
    switch(weather.type) {
      case 'sunny': return <Sun {...iconProps} />;
      case 'cloudy': return <Cloud {...iconProps} />;
      case 'rainy': return <CloudRain {...iconProps} />;
      case 'snowy': return <CloudSnow {...iconProps} />;
      case 'stormy': return <CloudLightning {...iconProps} />;
      case 'night': return <Moon {...iconProps} />;
      default: return null;
    }
  };

  const getBackgroundClass = () => {
    switch(weather.type) {
      case 'sunny': return 'bg-gradient-to-br from-blue-400 via-yellow-300 to-orange-500';
      case 'cloudy': return 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500';
      case 'rainy': return 'bg-gradient-to-br from-blue-700 via-blue-500 to-gray-400';
      case 'snowy': return 'bg-gradient-to-br from-blue-100 via-gray-200 to-white';
      case 'stormy': return 'bg-gradient-to-br from-gray-700 via-purple-600 to-gray-800';
      case 'night': return 'bg-gradient-to-br from-indigo-900 via-purple-800 to-black';
      default: return 'bg-gradient-to-br from-blue-500 to-purple-600';
    }
  };

  return (
    <div className={`relative overflow-hidden p-8 rounded-3xl shadow-lg text-white flex flex-col items-center justify-between transition-all duration-1000 ease-in-out w-80 h-128 ${getBackgroundClass()}`}>
      <div className="w-full z-10">
        <div className="text-6xl font-light mb-4 animate-fade-in">
          {time.getHours().toString().padStart(2, '0')}:{time.getMinutes().toString().padStart(2, '0')}
        </div>
      </div>
      <div className="flex flex-col items-center z-10">
        <WeatherIcon />
        <div className="text-3xl capitalize font-light mt-4 animate-fade-in">
          {weather.type}
        </div>
        <div className="flex items-center mt-2 animate-fade-in">
          <Thermometer className="text-white mr-2" size={24} />
          <span className="text-4xl font-light">{weather.temp}°C</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherTimeWidget;