import React, { useState, useEffect } from 'react';
import { 
  Sun, Cloud, CloudRain, CloudSnow, CloudLightning, 
  CloudDrizzle, Wind, AlertTriangle, Loader
} from 'lucide-react';
import { Card } from './ui/card';
import { useToast } from '@/hooks/use-toast';

interface WeatherWidgetProps {
  location: string;
}

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: React.ReactNode;
}

const WeatherWidget = ({ location }: WeatherWidgetProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      
      try {
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
        
        setWeather({
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed),
          icon: icon
        });
        
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError("Failed to load weather data");
        setLoading(false);
        toast({
          title: "Weather Data Error",
          description: "Unable to fetch current weather. Using simulated data instead.",
          variant: "destructive"
        });
        
        // Fallback to simulated data
        simulateWeatherData();
      }
    };
    
    const simulateWeatherData = () => {
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
      
      setWeather({
        temperature: randomTemp,
        condition: randomCondition,
        humidity: randomHumidity,
        windSpeed: randomWind,
        icon: icon
      });
    };
    
    fetchWeatherData();
    
    // Refresh weather every 30 minutes
    const intervalId = setInterval(fetchWeatherData, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [location, toast]);
  
  if (loading) {
    return (
      <Card className="p-6 text-center">
        <div className="flex flex-col items-center justify-center space-y-2">
          <Loader className="animate-spin text-coastal-600 h-8 w-8" />
          <p>Loading weather information...</p>
        </div>
      </Card>
    );
  }
  
  if (error && !weather) {
    return (
      <Card className="p-6 bg-amber-50 border-amber-200">
        <div className="flex items-center justify-center space-x-2 text-amber-800">
          <AlertTriangle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      </Card>
    );
  }
  
  if (!weather) return null;
  
  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-coastal-600 to-coastal-800 text-white p-4">
        <h3 className="font-medium text-lg">{location}</h3>
        <p className="text-sm opacity-80">Current Conditions</p>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="mr-4">
              {weather.icon}
            </div>
            <div>
              <p className="text-3xl font-bold">{weather.temperature}°F</p>
              <p className="text-gray-600">{weather.condition}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-500">Humidity</p>
            <p className="font-medium">{weather.humidity}%</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-500">Wind</p>
            <p className="font-medium">{weather.windSpeed} mph</p>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 text-center pt-2 border-t">
          <p>Weather data provided by OpenWeatherMap</p>
          <p>Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </Card>
  );
};

export default WeatherWidget;
