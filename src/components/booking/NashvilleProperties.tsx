
import React from 'react';
import { useProperties } from '@/hooks/use-properties';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin } from 'lucide-react';

const NashvilleProperties = () => {
  const { propertiesData } = useProperties();
  const { nashville } = propertiesData;

  return (
    <div className="mt-4 mb-2">
      <h3 className="text-sm font-medium mb-2">Available Nashville Properties:</h3>
      <div className="grid grid-cols-1 gap-4">
        {nashville.map((property) => (
          <Card key={property.id} className="shadow-sm">
            <div className="flex flex-col sm:flex-row">
              <div className="relative h-32 sm:h-auto sm:w-1/3">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
                />
              </div>
              <div className="flex-1 p-4">
                <div className="flex items-center mb-1">
                  <MapPin className="h-3 w-3 text-hamptons-accent mr-1" />
                  <span className="text-xs text-gray-600">{property.location}</span>
                </div>
                <h4 className="text-base font-medium mb-1">{property.name}</h4>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{property.description}</p>
                <a 
                  href={property.airbnbLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-primary flex items-center"
                >
                  View on Airbnb <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Please select a specific property in special requests or we'll assign the best available option.
      </p>
    </div>
  );
};

export default NashvilleProperties;
