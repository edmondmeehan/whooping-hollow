
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

// Separate function to map weather codes to icons
export const getWeatherIcon = (weatherCode: number): React.ReactNode => {
  if (weatherCode >= 200 && weatherCode < 300) {
    return <CloudLightning className="text-purple-500 h-10 w-10" />;
  } else if (weatherCode >= 300 && weatherCode < 400) {
    return <CloudDrizzle className="text-blue-400 h-10 w-10" />;
  } else if (weatherCode >= 500 && weatherCode < 600) {
    return <CloudRain className="text-blue-500 h-10 w-10" />;
  } else if (weatherCode >= 600 && weatherCode < 700) {
    return <CloudSnow className="text-blue-200 h-10 w-10" />;
  } else if (weatherCode >= 700 && weatherCode < 800) {
    return <Wind className="text-gray-400 h-10 w-10" />;
  } else if (weatherCode === 800) {
    return <Sun className="text-yellow-500 h-10 w-10" />;
  } else if (weatherCode > 800) {
    return <Cloud className="text-gray-500 h-10 w-10" />;
  }
  
  // Default icon for unknown weather codes
  return <Cloud className="text-gray-500 h-10 w-10" />;
};

// Function to map weather condition strings to icons for simulated data
export const getIconForCondition = (condition: string): React.ReactNode => {
  switch (condition) {
    case 'Clear':
      return <Sun className="text-yellow-500 h-10 w-10" />;
    case 'Partly Cloudy':
    case 'Cloudy':
      return <Cloud className="text-gray-500 h-10 w-10" />;
    case 'Rain':
      return <CloudRain className="text-blue-500 h-10 w-10" />;
    case 'Thunderstorm':
      return <CloudLightning className="text-purple-500 h-10 w-10" />;
    case 'Snow':
      return <CloudSnow className="text-blue-200 h-10 w-10" />;
    case 'Drizzle':
      return <CloudDrizzle className="text-blue-400 h-10 w-10" />;
    case 'Windy':
      return <Wind className="text-gray-400 h-10 w-10" />;
    default:
      return <Sun className="text-yellow-500 h-10 w-10" />;
  }
};

// Get the OpenWeatherMap API key from localStorage
export const getOpenWeatherApiKey = (): string => {
  // Try to find an existing API key from the stored API keys
  try {
    const savedApiKeys = localStorage.getItem('whh_api_keys');
    console.log('Raw API keys from localStorage:', savedApiKeys);
    
    if (savedApiKeys) {
      const apiKeys = JSON.parse(savedApiKeys);
      console.log('Parsed API keys:', apiKeys);
      
      // Try to find a key specifically for OpenWeatherMap
      const weatherApiKey = apiKeys.find((api: any) => 
        api.name.toLowerCase().includes('weather') || 
        api.name.toLowerCase().includes('openweather')
      );
      
      if (weatherApiKey) {
        console.log('Found weather API key:', weatherApiKey.name, 'Key exists:', !!weatherApiKey.key, 'Key length:', weatherApiKey.key?.length);
        
        if (weatherApiKey.key && weatherApiKey.key.trim() !== '') {
          console.log('Using OpenWeather API key from storage:', weatherApiKey.name);
          return weatherApiKey.key;
        } else {
          console.log('Weather API key found but empty or invalid');
        }
      } else {
        console.log('No specific weather API key found');
      }
      
      // If no specific weather key, check all keys for one that might be for weather
      for (const api of apiKeys) {
        if (api.key && api.key.trim() !== '' && 
            (api.name.toLowerCase().includes('api') || api.name.toLowerCase().includes('key'))) {
          console.log('Using potential API key from storage:', api.name);
          return api.key;
        }
      }
    } else {
      console.log('No API keys found in localStorage');
    }
  } catch (err) {
    console.error('Error parsing API keys from localStorage:', err);
  }
  
  // Default key as fallback (though it's likely expired/invalid)
  console.log('Using fallback API key');
  return '';
};

export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  // Get the API key from localStorage or use the default
  const apiKey = getOpenWeatherApiKey();
  
  if (!apiKey) {
    console.error('No valid OpenWeatherMap API key found');
    throw new Error('OpenWeatherMap API key is missing. Please add a valid key in the admin panel.');
  }
  
  const city = encodeURIComponent(location.split(',')[0].trim()); // Extract and encode city from location
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  
  console.log('Fetching weather from:', url.replace(apiKey, '***API_KEY***'));
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Weather API error (${response.status}):`, errorText);
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Weather data received:', data);
    
    // Get weather icon based on OpenWeatherMap condition code
    const weatherCode = data.weather[0].id;
    const icon = getWeatherIcon(weatherCode);
    
    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed),
      icon: icon
    };
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    throw error;
  }
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
  
  // Get icon based on condition using the new helper function
  const icon = getIconForCondition(randomCondition);
  
  return {
    temperature: randomTemp,
    condition: randomCondition,
    humidity: randomHumidity,
    windSpeed: randomWind,
    icon: icon
  };
};
