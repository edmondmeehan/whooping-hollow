
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import WelcomeTab from './guide/WelcomeTab';
import HouseInfoTab from './guide/HouseInfoTab';
import LocalAreaTab from './guide/LocalAreaTab';
import CheckoutTab from './guide/CheckoutTab';
import EmergencyTab from './guide/EmergencyTab';

const GuideTabs = () => {
  return (
    <Tabs defaultValue="welcome" className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-5 h-auto">
        <TabsTrigger value="welcome" className="py-3">Welcome</TabsTrigger>
        <TabsTrigger value="house" className="py-3">House Info</TabsTrigger>
        <TabsTrigger value="local" className="py-3">Local Area</TabsTrigger>
        <TabsTrigger value="checkout" className="py-3">Check-out</TabsTrigger>
        <TabsTrigger value="emergency" className="py-3">Emergency</TabsTrigger>
      </TabsList>
      
      <div className="mt-8">
        <TabsContent value="welcome">
          <WelcomeTab />
        </TabsContent>
        
        <TabsContent value="house">
          <HouseInfoTab />
        </TabsContent>
        
        <TabsContent value="local">
          <LocalAreaTab />
        </TabsContent>
        
        <TabsContent value="checkout">
          <CheckoutTab />
        </TabsContent>
        
        <TabsContent value="emergency">
          <EmergencyTab />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default GuideTabs;
