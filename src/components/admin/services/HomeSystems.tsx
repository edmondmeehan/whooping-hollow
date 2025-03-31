
import React from 'react';
import { HomeIcon, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EditableHomeSystemsTable from './EditableHomeSystemsTable';
import SecurityNotice from './SecurityNotice';
import { Button } from '@/components/ui/button';
import { useHomeSystems } from '@/hooks/admin/use-home-systems';

const HomeSystems = () => {
  const { reload } = useHomeSystems();
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <HomeIcon className="mr-2 h-5 w-5 text-hamptons-accent" />
              Home Systems & Apps
            </CardTitle>
            <CardDescription>
              Access codes and information for home systems
            </CardDescription>
          </div>
          <Button onClick={reload} variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <EditableHomeSystemsTable />
        <SecurityNotice />
      </CardContent>
    </Card>
  );
};

export default HomeSystems;
