
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import HouseServicesHeader from './houseServicesDirectory/HouseServicesHeader';
import HouseServicesTable from './houseServicesDirectory/HouseServicesTable';
import { houseServices, sortServicesByStatus } from './houseServicesDirectory/houseServicesData';

const HouseServicesDirectory = () => {
  // Sort services by status: Updated first, then Active, then Inactive
  const sortedServices = sortServicesByStatus(houseServices);

  return (
    <Card className="shadow-md border-none">
      <CardHeader className="bg-hamptons-light pb-2">
        <HouseServicesHeader />
      </CardHeader>
      <CardContent className="p-0">
        <HouseServicesTable services={sortedServices} />
      </CardContent>
    </Card>
  );
};

export default HouseServicesDirectory;
