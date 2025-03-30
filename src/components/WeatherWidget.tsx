
import React from 'react';
import { useWeather } from '@/hooks/use-weather';
import WeatherLoading from './weather/WeatherLoading';
import WeatherError from './weather/WeatherError';
import WeatherDisplay from './weather/WeatherDisplay';
import { Link } from 'react-router-dom';

interface WeatherWidgetProps {
  location: string;
}

const WeatherWidget = ({ location }: WeatherWidgetProps) => {
  const { weather, loading, error } = useWeather(location);
  
  if (loading) {
    return <WeatherLoading />;
  }
  
  if (error && !weather) {
    // Check if error is likely due to an API key issue
    if (error.includes('401') || error.includes('Unauthorized')) {
      return (
        <WeatherError 
          error={
            <span>
              OpenWeatherMap API key is invalid. Please update it in the{' '}
              <Link to="/admin" className="text-blue-600 hover:underline">admin panel</Link>.
            </span>
          } 
        />
      );
    }
    return <WeatherError error={error} />;
  }
  
  if (!weather) return null;
  
  return <WeatherDisplay location={location} weather={weather} />;
};

export default WeatherWidget;
