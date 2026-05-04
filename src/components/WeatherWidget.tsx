import React, { useState } from 'react';
import { useWeather } from '@/hooks/use-weather';
import { Loader, CloudOff, Droplets, Wind } from 'lucide-react';
import { motion } from 'framer-motion';

interface WeatherWidgetProps {
  location?: string;
}

const toC = (f: number) => Math.round((f - 32) * 5 / 9);

const WeatherWidget = ({ location = "East Hampton, NY" }: WeatherWidgetProps) => {
  const { weather, loading, isSimulated } = useWeather(location);
  const [unit, setUnit] = useState<'F' | 'C'>('F');

  const temp = (f: number) => unit === 'F' ? f : toC(f);

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-2 text-muted-foreground py-8">
            <Loader className="animate-spin h-5 w-5" />
            <span className="text-sm font-sans">Loading weather...</span>
          </div>
        </div>
      </section>
    );
  }

  if (!weather) return null;

  const { current, forecast } = weather;

  return (
    <section className="py-16 md:py-20 bg-muted/30 relative overflow-hidden">
      {/* Decorative blur */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Section header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-accent" />
              <span className="text-accent uppercase tracking-[0.3em] text-xs font-semibold font-sans">
                Current Weather
              </span>
              <div className="h-px w-12 bg-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
              {location}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Current conditions card */}
            <div className="bg-card rounded-xl border border-border shadow-[var(--shadow-soft)] overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  {/* Temperature + condition */}
                  <div className="flex items-center gap-5">
                    <div className="text-primary">{current.icon}</div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-serif font-bold text-foreground">
                          {temp(current.temperature)}°
                        </span>
                        {/* Unit toggle */}
                        <div className="flex items-center rounded-full bg-muted p-0.5 font-sans text-xs">
                          <button
                            onClick={() => setUnit('F')}
                            className={`px-2.5 py-1 rounded-full transition-all ${
                              unit === 'F'
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            °F
                          </button>
                          <button
                            onClick={() => setUnit('C')}
                            className={`px-2.5 py-1 rounded-full transition-all ${
                              unit === 'C'
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            °C
                          </button>
                        </div>
                      </div>
                      <p className="text-muted-foreground font-sans mt-1">{current.condition}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="hidden sm:flex flex-col gap-2 text-sm font-sans text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-primary/60" /> {current.humidity}% humidity
                    </span>
                    <span className="flex items-center gap-2">
                      <Wind className="h-4 w-4 text-primary/60" /> {current.windSpeed} mph wind
                    </span>
                  </div>
                </div>

                {/* Mobile details */}
                <div className="flex sm:hidden gap-4 text-sm font-sans text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5">
                    <Droplets className="h-3.5 w-3.5 text-primary/60" /> {current.humidity}%
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Wind className="h-3.5 w-3.5 text-primary/60" /> {current.windSpeed} mph
                  </span>
                </div>

                {isSimulated && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-sans bg-muted rounded-lg px-3 py-2 mb-2">
                    <CloudOff className="h-3 w-3" />
                    <span>Simulated data — add a VisualCrossing API key in admin for live weather</span>
                  </div>
                )}
              </div>

              {/* 7-day forecast */}
              <div className="border-t border-border bg-muted/30 px-4 sm:px-8 py-5">
                <p className="text-[11px] font-sans font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-4">
                  7-Day Forecast
                </p>
                <div className="grid grid-cols-7 gap-1">
                  {forecast.map((day, i) => (
                    <motion.div
                      key={day.date}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className={`flex flex-col items-center text-center gap-1.5 py-3 px-0.5 rounded-lg transition-colors overflow-hidden ${
                        i === 0 ? 'bg-primary/5' : 'hover:bg-muted/60'
                      }`}
                    >
                      <span className={`text-[10px] sm:text-[11px] font-sans font-medium truncate max-w-full ${
                        i === 0 ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                        <span className="sm:hidden">
                          {day.dayName === 'Today' ? 'Today' : day.dayName === 'Tomorrow' ? 'Tmrw' : day.dayName}
                        </span>
                        <span className="hidden sm:inline">{day.dayName}</span>
                      </span>
                      <div className="my-0.5">{day.icon}</div>
                      <span className="text-sm font-semibold font-sans text-foreground">
                        {temp(day.tempMax)}°
                      </span>
                      <span className="text-[11px] font-sans text-muted-foreground">
                        {temp(day.tempMin)}°
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Attribution */}
              <div className="border-t border-border px-4 py-2 text-center">
                <p className="text-[10px] font-sans text-muted-foreground/60">
                  Weather data by VisualCrossing
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeatherWidget;
