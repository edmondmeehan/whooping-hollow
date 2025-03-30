
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface WeatherErrorProps {
  error: string;
}

const WeatherError = ({ error }: WeatherErrorProps) => {
  return (
    <Card className="p-6 bg-amber-50 border-amber-200">
      <div className="flex items-center justify-center space-x-2 text-amber-800">
        <AlertTriangle className="h-5 w-5" />
        <p>{error}</p>
      </div>
    </Card>
  );
};

export default WeatherError;
