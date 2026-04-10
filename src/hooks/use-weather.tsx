import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { WeatherWithForecast, fetchWeatherData, simulateWeatherData } from '@/utils/weatherUtils';

export const useWeather = (location: string) => {
  const [weather, setWeather] = useState<WeatherWithForecast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSimulated, setIsSimulated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getWeatherData = async () => {
      setLoading(true);
      setIsSimulated(false);
      
      try {
        const data = await fetchWeatherData(location);
        setWeather(data);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load weather data';
        setError(errorMessage);
        
        if (errorMessage.includes('API key') || errorMessage.includes('401')) {
          toast({
            title: "Weather API Key Issue",
            description: "Please add a valid VisualCrossing Weather API key in the admin panel.",
            variant: "destructive"
          });
        }
        
        const simulatedData = simulateWeatherData();
        setWeather(simulatedData);
        setIsSimulated(true);
      } finally {
        setLoading(false);
      }
    };
    
    getWeatherData();
    const intervalId = setInterval(getWeatherData, 30 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [location, toast]);

  return { weather, loading, error, isSimulated };
};
