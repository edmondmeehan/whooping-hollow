import { useState, useEffect } from 'react';

export interface CurrentWeather {
  temperature: number;
  label: string;
}

const codeToLabel = (code: number): string => {
  if (code === 0) return 'Clear';
  if (code <= 2) return 'Partly cloudy';
  if (code === 3) return 'Overcast';
  if (code >= 45 && code <= 48) return 'Fog';
  if (code >= 51 && code <= 57) return 'Drizzle';
  if (code >= 61 && code <= 67) return 'Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 80 && code <= 82) return 'Showers';
  if (code >= 85 && code <= 86) return 'Snow showers';
  if (code >= 95) return 'Thunderstorms';
  return 'Clear';
};

const ENDPOINT =
  'https://api.open-meteo.com/v1/forecast?latitude=40.9787&longitude=-72.1998&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America%2FNew_York';

export const useCurrentWeather = () => {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const res = await fetch(ENDPOINT);
        if (!res.ok) return;
        const json = await res.json();
        const current = json?.current;
        if (!active || !current || typeof current.temperature_2m !== 'number') return;
        setWeather({
          temperature: Math.round(current.temperature_2m),
          label: codeToLabel(Number(current.weather_code)),
        });
      } catch {
        // Silently hide the pill on failure
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  return weather;
};
