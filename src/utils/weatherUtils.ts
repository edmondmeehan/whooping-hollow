
import React from 'react';
import { 
  Sun, Cloud, CloudRain, CloudSnow, CloudLightning, 
  CloudDrizzle, Wind
} from 'lucide-react';

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: React.ReactNode;
}

export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  // OpenWeatherMap API - Using a more reliable API key structure
  const apiKey = '7f2a84e55a3ab15a8df0886f3db6876d'; // Free API key for demo purposes
  const city = encodeURIComponent(location.split(',')[0].trim()); // Extract and encode city from location
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  
  console.log('Fetching weather from:', url);
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  console.log('Weather data received:', data);
  
  // Select icon based on OpenWeatherMap condition code
  let icon;
  const weatherCode = data.weather[0].id;
  
  if (weatherCode >= 200 && weatherCode < 300) {
    icon = <CloudLightning className="text-purple-500 h-10 w-10" />;
  } else if (weatherCode >= 300 && weatherCode < 400) {
    icon = <CloudDrizzle className="text-blue-400 h-10 w-10" />;
  } else if (weatherCode >= 500 && weatherCode < 600) {
    icon = <CloudRain className="text-blue-500 h-10 w-10" />;
  } else if (weatherCode >= 600 && weatherCode < 700) {
    icon = <CloudSnow className="text-blue-200 h-10 w-10" />;
  } else if (weatherCode >= 700 && weatherCode < 800) {
    icon = <Wind className="text-gray-400 h-10 w-10" />;
  } else if (weatherCode === 800) {
    icon = <Sun className="text-yellow-500 h-10 w-10" />;
  } else if (weatherCode > 800) {
    icon = <Cloud className="text-gray-500 h-10 w-10" />;
  }
  
  return {
    temperature: Math.round(data.main.temp),
    condition: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed),
    icon: icon
  };
};

export const simulateWeatherData = (): WeatherData => {
  // This is a simulation - as a fallback when API fails
  const conditions = [
    'Clear', 'Partly Cloudy', 'Cloudy', 'Rain', 
    'Thunderstorm', 'Snow', 'Drizzle', 'Windy'
  ];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  const randomTemp = Math.floor(Math.random() * 35) + 50; // 50-85°F
  const randomHumidity = Math.floor(Math.random() * 50) + 30; // 30-80%
  const randomWind = Math.floor(Math.random() * 15) + 2; // 2-17 mph
  
  // Select icon based on condition
  let icon;
  switch (randomCondition) {
    case 'Clear':
      icon = <Sun className="text-yellow-500 h-10 w-10" />;
      break;
    case 'Partly Cloudy':
    case 'Cloudy':
      icon = <Cloud className="text-gray-500 h-10 w-10" />;
      break;
    case 'Rain':
      icon = <CloudRain className="text-blue-500 h-10 w-10" />;
      break;
    case 'Thunderstorm':
      icon = <CloudLightning className="text-purple-500 h-10 w-10" />;
      break;
    case 'Snow':
      icon = <CloudSnow className="text-blue-200 h-10 w-10" />;
      break;
    case 'Drizzle':
      icon = <CloudDrizzle className="text-blue-400 h-10 w-10" />;
      break;
    case 'Windy':
      icon = <Wind className="text-gray-400 h-10 w-10" />;
      break;
    default:
      icon = <Sun className="text-yellow-500 h-10 w-10" />;
  }
  
  return {
    temperature: randomTemp,
    condition: randomCondition,
    humidity: randomHumidity,
    windSpeed: randomWind,
    icon: icon
  };
};
