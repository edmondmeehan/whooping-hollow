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

export interface ForecastDay {
  date: string;
  dayName: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  icon: React.ReactNode;
}

export interface WeatherWithForecast {
  current: WeatherData;
  forecast: ForecastDay[];
}

export const getWeatherIcon = (conditionCode: string, size: string = "h-10 w-10"): React.ReactNode => {
  const code = conditionCode.toLowerCase();
  
  if (code.includes('thunder') || code.includes('lightning')) {
    return <CloudLightning className={`text-purple-500 ${size}`} />;
  } else if (code.includes('drizzle')) {
    return <CloudDrizzle className={`text-blue-400 ${size}`} />;
  } else if (code.includes('rain') || code.includes('shower')) {
    return <CloudRain className={`text-blue-500 ${size}`} />;
  } else if (code.includes('snow') || code.includes('ice') || code.includes('sleet')) {
    return <CloudSnow className={`text-blue-200 ${size}`} />;
  } else if (code.includes('fog') || code.includes('mist')) {
    return <CloudFog className={`text-muted-foreground ${size}`} />;
  } else if (code.includes('wind')) {
    return <Wind className={`text-muted-foreground ${size}`} />;
  } else if (code.includes('clear') || code.includes('sunny')) {
    return <Sun className={`text-yellow-500 ${size}`} />;
  } else if (code.includes('cloud') || code.includes('overcast') || code.includes('part')) {
    return <Cloud className={`text-muted-foreground ${size}`} />;
  }
  
  return <Cloud className={`text-muted-foreground ${size}`} />;
};

export const getIconForCondition = (condition: string, size: string = "h-10 w-10"): React.ReactNode => {
  switch (condition) {
    case 'Clear':
      return <Sun className={`text-yellow-500 ${size}`} />;
    case 'Partly Cloudy':
    case 'Cloudy':
      return <Cloud className={`text-muted-foreground ${size}`} />;
    case 'Rain':
      return <CloudRain className={`text-blue-500 ${size}`} />;
    case 'Thunderstorm':
      return <CloudLightning className={`text-purple-500 ${size}`} />;
    case 'Snow':
      return <CloudSnow className={`text-blue-200 ${size}`} />;
    case 'Drizzle':
      return <CloudDrizzle className={`text-blue-400 ${size}`} />;
    case 'Windy':
      return <Wind className={`text-muted-foreground ${size}`} />;
    default:
      return <Sun className={`text-yellow-500 ${size}`} />;
  }
};

export const getWeatherApiKey = (): string => {
  try {
    const savedApiKeys = localStorage.getItem('whh_api_keys');
    if (savedApiKeys) {
      const apiKeys = JSON.parse(savedApiKeys);
      const weatherApiKey = apiKeys.find((api: any) => 
        api.name.toLowerCase().includes('visualcrossing') || 
        api.name.toLowerCase().includes('weather') ||
        api.name.toLowerCase().includes('visual crossing')
      );
      if (weatherApiKey?.key?.trim()) {
        return weatherApiKey.key;
      }
    }
  } catch (err) {
    console.error('Error parsing API keys from localStorage:', err);
  }
  return '';
};

const getDayName = (dateStr: string): string => {
  const date = new Date(dateStr + 'T12:00:00');
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export const fetchWeatherData = async (location: string): Promise<WeatherWithForecast> => {
  const apiKey = getWeatherApiKey();
  
  if (!apiKey) {
    throw new Error('VisualCrossing Weather API key is missing. Please add a valid key in the admin panel.');
  }
  
  const city = encodeURIComponent(location.split(',')[0].trim());
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=us&key=${apiKey}&contentType=json&include=current,days`;
  
  console.log('Fetching weather from:', url.replace(apiKey, '***'));
  
  const response = await fetch(url);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Weather API error (${response.status}):`, errorText);
    throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  const cc = data.currentConditions;
  
  const current: WeatherData = {
    temperature: Math.round(cc.temp),
    condition: cc.conditions || 'Unknown',
    humidity: cc.humidity || 0,
    windSpeed: Math.round(cc.windspeed || 0),
    icon: getWeatherIcon(cc.conditions || 'cloudy'),
  };

  const forecast: ForecastDay[] = (data.days || []).slice(0, 7).map((day: any) => ({
    date: day.datetime,
    dayName: getDayName(day.datetime),
    tempMax: Math.round(day.tempmax),
    tempMin: Math.round(day.tempmin),
    condition: day.conditions || 'Unknown',
    icon: getWeatherIcon(day.conditions || 'cloudy', 'h-5 w-5'),
  }));

  return { current, forecast };
};

export const simulateWeatherData = (): WeatherWithForecast => {
  const conditions = ['Clear', 'Partly Cloudy', 'Cloudy', 'Rain', 'Thunderstorm', 'Snow', 'Drizzle', 'Windy'];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  
  const current: WeatherData = {
    temperature: Math.floor(Math.random() * 35) + 50,
    condition: randomCondition,
    humidity: Math.floor(Math.random() * 50) + 30,
    windSpeed: Math.floor(Math.random() * 15) + 2,
    icon: getIconForCondition(randomCondition),
  };

  const today = new Date();
  const forecast: ForecastDay[] = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const cond = conditions[Math.floor(Math.random() * conditions.length)];
    const hi = Math.floor(Math.random() * 25) + 55;
    return {
      date: date.toISOString().split('T')[0],
      dayName: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { weekday: 'short' }),
      tempMax: hi,
      tempMin: hi - Math.floor(Math.random() * 15) - 5,
      condition: cond,
      icon: getIconForCondition(cond, 'h-5 w-5'),
    };
  });

  return { current, forecast };
};
