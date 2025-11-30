
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import WelcomeTab from './guide/WelcomeTab';
import HouseInfoTab from './guide/HouseInfoTab';
import LocalAreaTab from './guide/LocalAreaTab';
import CheckoutTab from './guide/CheckoutTab';
import EmergencyTab from './guide/EmergencyTab';

interface GuideTabsProps {
  propertyId?: string;
}

const GuideTabs: React.FC<GuideTabsProps> = ({ propertyId }) => {
  // Generate a timestamp for forcing content refresh
  const [refreshKey, setRefreshKey] = useState(Date.now().toString());

  // Listen for storage events to refresh the tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'guideContentSections') {
        setRefreshKey(Date.now().toString());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Refresh periodically to catch any changes
    const interval = setInterval(() => {
      setRefreshKey(Date.now().toString());
    }, 5000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <Tabs defaultValue="welcome" className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-5 h-auto bg-muted/50 p-2 rounded-xl border border-border shadow-[var(--shadow-soft)]">
        <TabsTrigger 
          value="welcome" 
          className="py-3 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[var(--shadow-elegant)] transition-all duration-300 rounded-lg font-medium"
        >
          Welcome
        </TabsTrigger>
        <TabsTrigger 
          value="house" 
          className="py-3 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[var(--shadow-elegant)] transition-all duration-300 rounded-lg font-medium"
        >
          House Info
        </TabsTrigger>
        <TabsTrigger 
          value="local" 
          className="py-3 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[var(--shadow-elegant)] transition-all duration-300 rounded-lg font-medium"
        >
          Local Area
        </TabsTrigger>
        <TabsTrigger 
          value="checkout" 
          className="py-3 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[var(--shadow-elegant)] transition-all duration-300 rounded-lg font-medium"
        >
          Check-out
        </TabsTrigger>
        <TabsTrigger 
          value="emergency" 
          className="py-3 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[var(--shadow-elegant)] transition-all duration-300 rounded-lg font-medium"
        >
          Emergency
        </TabsTrigger>
      </TabsList>
      
      <div className="mt-12">
        <TabsContent value="welcome" className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-[var(--shadow-soft)]">
          <WelcomeTab key={`welcome-${refreshKey}`} />
        </TabsContent>
        
        <TabsContent value="house" className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-[var(--shadow-soft)]">
          <HouseInfoTab key={`house-${refreshKey}`} />
        </TabsContent>
        
        <TabsContent value="local" className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-[var(--shadow-soft)]">
          <LocalAreaTab key={`local-${refreshKey}`} />
        </TabsContent>
        
        <TabsContent value="checkout" className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-[var(--shadow-soft)]">
          <CheckoutTab key={`checkout-${refreshKey}`} />
        </TabsContent>
        
        <TabsContent value="emergency" className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-[var(--shadow-soft)]">
          <EmergencyTab key={`emergency-${refreshKey}`} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default GuideTabs;
