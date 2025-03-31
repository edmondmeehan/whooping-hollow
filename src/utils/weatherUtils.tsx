import React from 'react';
import { 
  Sun, Cloud, CloudRain, CloudSnow, CloudLightning, 
  CloudDrizzle, Wind, CloudFog
} from 'lucide-react';

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: React.ReactNode;
}

// Separate function to map weather codes to icons
export const getWeatherIcon = (conditionCode: string): React.ReactNode => {
  const code = conditionCode.toLowerCase();
  
  if (code.includes('thunder') || code.includes('lightning')) {
    return <CloudLightning className="text-purple-500 h-10 w-10" />;
  } else if (code.includes('drizzle')) {
    return <CloudDrizzle className="text-blue-400 h-10 w-10" />;
  } else if (code.includes('rain') || code.includes('shower')) {
    return <CloudRain className="text-blue-500 h-10 w-10" />;
  } else if (code.includes('snow') || code.includes('ice') || code.includes('sleet')) {
    return <CloudSnow className="text-blue-200 h-10 w-10" />;
  } else if (code.includes('fog') || code.includes('mist')) {
    return <CloudFog className="text-gray-400 h-10 w-10" />;
  } else if (code.includes('wind')) {
    return <Wind className="text-gray-400 h-10 w-10" />;
  } else if (code.includes('clear') || code.includes('sunny')) {
    return <Sun className="text-yellow-500 h-10 w-10" />;
  } else if (code.includes('cloud') || code.includes('overcast') || code.includes('part')) {
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

// Get the VisualCrossing API key from localStorage
export const getWeatherApiKey = (): string => {
  // Try to find an existing API key from the stored API keys
  try {
    const savedApiKeys = localStorage.getItem('whh_api_keys');
    console.log('Raw API keys from localStorage:', savedApiKeys);
    
    if (savedApiKeys) {
      const apiKeys = JSON.parse(savedApiKeys);
      console.log('Parsed API keys:', apiKeys);
      
      // Try to find a key specifically for VisualCrossing
      const weatherApiKey = apiKeys.find((api: any) => 
        api.name.toLowerCase().includes('visualcrossing') || 
        api.name.toLowerCase().includes('weather') ||
        api.name.toLowerCase().includes('visual crossing')
      );
      
      if (weatherApiKey) {
        console.log('Found weather API key:', weatherApiKey.name, 'Key exists:', !!weatherApiKey.key, 'Key length:', weatherApiKey.key?.length);
        
        if (weatherApiKey.key && weatherApiKey.key.trim() !== '') {
          console.log('Using VisualCrossing API key from storage:', weatherApiKey.name);
          return weatherApiKey.key;
        } else {
          console.log('Weather API key found but empty or invalid');
        }
      } else {
        console.log('No specific weather API key found');
      }
    } else {
      console.log('No API keys found in localStorage');
    }
  } catch (err) {
    console.error('Error parsing API keys from localStorage:', err);
  }
  
  // Return empty string as fallback (will trigger simulation)
  console.log('No valid API key found, returning empty string');
  return '';
};

export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  // Get the API key from localStorage
  const apiKey = getWeatherApiKey();
  
  if (!apiKey) {
    console.error('No valid VisualCrossing API key found');
    throw new Error('VisualCrossing Weather API key is missing. Please add a valid key in the admin panel.');
  }
  
  const city = encodeURIComponent(location.split(',')[0].trim()); // Extract and encode city from location
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${apiKey}&contentType=json`;
  
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
    
    // Extract the current conditions from the VisualCrossing API response
    const currentConditions = data.currentConditions;
    const icon = getWeatherIcon(currentConditions.conditions || 'cloudy');
    
    return {
      temperature: Math.round(currentConditions.temp),
      condition: currentConditions.conditions || 'Unknown',
      humidity: currentConditions.humidity || 0,
      windSpeed: Math.round(currentConditions.windspeed || 0),
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
