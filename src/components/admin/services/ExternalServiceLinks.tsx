
import React from 'react';
import { Link, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ExternalServiceLinks = () => {
  const externalServices = [
    {
      name: 'StayMarquis',
      url: 'https://staymarquis.com/owners',
      description: 'Owner portal for property management'
    },
    {
      name: 'SimpliSafe',
      url: 'https://simplisafe.com',
      description: 'Home security system'
    },
    {
      name: 'Schlage',
      url: 'https://www.schlage.com',
      description: 'Smart locks management'
    },
    {
      name: 'Wyze',
      url: 'https://www.wyze.com',
      description: 'Camera system'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Link className="mr-2 h-5 w-5 text-hamptons-accent" />
          External Service Links
        </CardTitle>
        <CardDescription>
          Quick access to important external services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {externalServices.map((service) => (
            <a 
              key={service.name}
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition-colors"
            >
              <div className="mr-3">
                <ExternalLink className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <div className="font-medium">{service.name}</div>
                <div className="text-sm text-gray-500">{service.description}</div>
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExternalServiceLinks;
