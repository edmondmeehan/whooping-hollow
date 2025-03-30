
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { WeatherData, fetchWeatherData, simulateWeatherData } from '@/utils/weatherUtils';

export const useWeather = (location: string) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getWeatherData = async () => {
      setLoading(true);
      
      try {
        const weatherData = await fetchWeatherData(location);
        setWeather(weatherData);
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
        const simulatedData = simulateWeatherData();
        setWeather(simulatedData);
      }
    };
    
    getWeatherData();
    
    // Refresh weather every 30 minutes
    const intervalId = setInterval(getWeatherData, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [location, toast]);

  return { weather, loading, error };
};
