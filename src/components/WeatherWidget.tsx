
import React from 'react';
import { useWeather } from '@/hooks/use-weather';
import WeatherLoading from './weather/WeatherLoading';
import WeatherError from './weather/WeatherError';
import WeatherDisplay from './weather/WeatherDisplay';

interface WeatherWidgetProps {
  location: string;
}

const WeatherWidget = ({ location }: WeatherWidgetProps) => {
  const { weather, loading, error } = useWeather(location);
  
  if (loading) {
    return <WeatherLoading />;
  }
  
  if (error && !weather) {
    return <WeatherError error={error} />;
  }
  
  if (!weather) return null;
  
  return <WeatherDisplay location={location} weather={weather} />;
};

export default WeatherWidget;
