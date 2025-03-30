
import React from 'react';
import { Loader } from 'lucide-react';
import { Card } from '@/components/ui/card';

const WeatherLoading = () => {
  return (
    <Card className="p-6 text-center">
      <div className="flex flex-col items-center justify-center space-y-2">
        <Loader className="animate-spin text-coastal-600 h-8 w-8" />
        <p>Loading weather information...</p>
      </div>
    </Card>
  );
};

export default WeatherLoading;
