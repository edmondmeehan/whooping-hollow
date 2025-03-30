
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { WeatherData, fetchWeatherData, simulateWeatherData } from '@/utils/weatherUtils';

export const useWeather = (location: string) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSimulated, setIsSimulated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getWeatherData = async () => {
      setLoading(true);
      setIsSimulated(false);
      
      try {
        console.log('Attempting to fetch weather data for:', location);
        const weatherData = await fetchWeatherData(location);
        setWeather(weatherData);
        setLoading(false);
        setError(null);
        console.log('Successfully fetched real weather data');
      } catch (err) {
        console.error('Error fetching weather data:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load weather data';
        setError(errorMessage);
        setLoading(false);
        
        // Show specific error for API key issues
        if (errorMessage.includes('API key') || errorMessage.includes('401')) {
          toast({
            title: "Weather API Key Issue",
            description: "Please add a valid OpenWeatherMap API key in the admin panel.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Weather Data Error",
            description: "Unable to fetch current weather. Using simulated data instead.",
            variant: "destructive"
          });
        }
        
        // Fallback to simulated data
        console.log('Falling back to simulated weather data');
        const simulatedData = simulateWeatherData();
        setWeather(simulatedData);
        setIsSimulated(true);
      }
    };
    
    getWeatherData();
    
    // Refresh weather every 30 minutes
    const intervalId = setInterval(getWeatherData, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [location, toast]);

  return { weather, loading, error, isSimulated };
};
