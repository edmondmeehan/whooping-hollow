
import React from 'react';
import { HomeIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EditableHomeSystemsTable from './EditableHomeSystemsTable';
import SecurityNotice from './SecurityNotice';

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
        <EditableHomeSystemsTable />
        <SecurityNotice />
      </CardContent>
    </Card>
  );
};

export default HomeSystems;
