import React from 'react';
import { useWeather } from '@/hooks/use-weather';
import { Card } from '@/components/ui/card';
import { Loader, CloudOff, Droplets, Wind } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface WeatherWidgetProps {
  location?: string;
}

const WeatherWidget = ({ location = "East Hampton, NY" }: WeatherWidgetProps) => {
  const { weather, loading, isSimulated } = useWeather(location);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Loader className="animate-spin h-5 w-5" />
          <span className="text-sm">Loading weather...</span>
        </div>
      </Card>
    );
  }

  if (!weather) return null;

  const { current, forecast } = weather;

  return (
    <section className="py-12 bg-muted/30">
      <div className="container-custom">
        <Card className="overflow-hidden">
          {/* Current weather */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80 mb-1">{location}</p>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-bold leading-none">{current.temperature}°F</span>
                  <span className="text-sm opacity-90 pb-1">{current.condition}</span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm opacity-80">
                  <span className="flex items-center gap-1"><Droplets className="h-3.5 w-3.5" />{current.humidity}%</span>
                  <span className="flex items-center gap-1"><Wind className="h-3.5 w-3.5" />{current.windSpeed} mph</span>
                </div>
              </div>
              <div className="hidden sm:block">{current.icon}</div>
            </div>
            {isSimulated && (
              <div className="mt-3 flex items-center gap-1 text-xs opacity-70">
                <CloudOff className="h-3 w-3" />
                <span>Simulated data — add an API key in admin for live weather</span>
              </div>
            )}
          </div>

          {/* 7-day forecast */}
          <div className="p-4 sm:p-5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">7-Day Forecast</p>
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {forecast.map((day) => (
                <div key={day.date} className="flex flex-col items-center text-center gap-1 py-2">
                  <span className="text-xs font-medium text-muted-foreground">{day.dayName}</span>
                  <div className="my-1">{day.icon}</div>
                  <span className="text-sm font-semibold">{day.tempMax}°</span>
                  <span className="text-xs text-muted-foreground">{day.tempMin}°</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />
          <div className="px-4 py-2 text-center">
            <p className="text-[10px] text-muted-foreground">Weather data by VisualCrossing</p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default WeatherWidget;
