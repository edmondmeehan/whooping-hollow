
import React, { useState, useEffect } from 'react';
import { 
  Sun, Cloud, CloudRain, CloudSnow, CloudLightning, 
  CloudDrizzle, Wind, AlertTriangle, Loader
} from 'lucide-react';
import { Card } from './ui/card';

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

  useEffect(() => {
    // Simulate fetching weather data
    const fetchWeather = () => {
      setLoading(true);
      
      // This is a simulation - in a real app, you would call a weather API
      setTimeout(() => {
        try {
          // Random weather data for demonstration
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
              icon = <Sun className="text-yellow-500" />;
              break;
            case 'Partly Cloudy':
            case 'Cloudy':
              icon = <Cloud className="text-gray-500" />;
              break;
            case 'Rain':
              icon = <CloudRain className="text-blue-500" />;
              break;
            case 'Thunderstorm':
              icon = <CloudLightning className="text-purple-500" />;
              break;
            case 'Snow':
              icon = <CloudSnow className="text-blue-200" />;
              break;
            case 'Drizzle':
              icon = <CloudDrizzle className="text-blue-400" />;
              break;
            case 'Windy':
              icon = <Wind className="text-gray-400" />;
              break;
            default:
              icon = <Sun className="text-yellow-500" />;
          }
          
          setWeather({
            temperature: randomTemp,
            condition: randomCondition,
            humidity: randomHumidity,
            windSpeed: randomWind,
            icon: icon
          });
          
          setLoading(false);
          setError(null);
        } catch (err) {
          setError("Failed to load weather data");
          setLoading(false);
        }
      }, 1500); // simulate network delay
    };
    
    fetchWeather();
    
    // Refresh weather every 30 minutes
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [location]);
  
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
  
  if (error) {
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
          <p>Weather data is simulated for demonstration purposes</p>
          <p>Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </Card>
  );
};

export default WeatherWidget;
