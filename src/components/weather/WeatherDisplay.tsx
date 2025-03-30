
import React from 'react';
import { Card } from '@/components/ui/card';
import { WeatherData } from '@/utils/weatherUtils';

interface WeatherDisplayProps {
  location: string;
  weather: WeatherData;
}

const WeatherDisplay = ({ location, weather }: WeatherDisplayProps) => {
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

export default WeatherDisplay;
