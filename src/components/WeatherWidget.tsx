
import React from 'react';
import { useWeather } from '@/hooks/use-weather';
import WeatherLoading from './weather/WeatherLoading';
import WeatherError from './weather/WeatherError';
import WeatherDisplay from './weather/WeatherDisplay';
import { Link } from 'react-router-dom';
import { CloudOff } from 'lucide-react';

interface WeatherWidgetProps {
  location: string;
}

const WeatherWidget = ({ location }: WeatherWidgetProps) => {
  const { weather, loading, error, isSimulated } = useWeather(location);
  
  if (loading) {
    return <WeatherLoading />;
  }
  
  if (error && !weather) {
    // Check if error is likely due to an API key issue
    if (error.includes('API key') || error.includes('401') || error.includes('Unauthorized')) {
      return (
        <WeatherError 
          error={
            <span>
              OpenWeatherMap API key is missing or invalid. Please update it in the{' '}
              <Link to="/admin" className="text-blue-600 hover:underline">admin panel</Link>.
            </span>
          } 
        />
      );
    }
    return <WeatherError error={error} />;
  }
  
  if (!weather) return null;
  
  return (
    <div>
      {isSimulated && (
        <div className="mb-2 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-md text-sm flex items-center">
          <CloudOff className="h-3 w-3 mr-1" /> 
          <span>Using simulated weather data. Please add an API key in the admin panel.</span>
        </div>
      )}
      <WeatherDisplay location={location} weather={weather} />
    </div>
  );
};

export default WeatherWidget;
