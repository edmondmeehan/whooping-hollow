
import React from 'react';
import { HomeIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import HomeSystemsTable from './HomeSystemsTable';
import SecurityNotice from './SecurityNotice';
import { homeSystemsData } from './data/homeSystemsData';

const HomeSystems = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <HomeIcon className="mr-2 h-5 w-5 text-hamptons-accent" />
          Home Systems & Apps
        </CardTitle>
        <CardDescription>
          Access codes and information for home systems
        </CardDescription>
      </CardHeader>
      <CardContent>
        <HomeSystemsTable data={homeSystemsData} />
        <SecurityNotice />
      </CardContent>
    </Card>
  );
};

export default HomeSystems;
