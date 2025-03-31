
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname } from '@/hooks/use-pathname';
import AdminHero from './AdminHero';
import AdminProperties from './AdminProperties';
import AdminLocalArea from './AdminLocalArea';
import AdminImages from './AdminImages';
import AdminNewsletter from './AdminNewsletter';
import AdminGuide from './AdminGuide';
import AdminBookingRequests from './AdminBookingRequests';
import AdminApis from './AdminApis';
import AdminBookings from './AdminBookings';
import AdminUsers from './AdminUsers';

const AdminDashboard = () => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>(
    pathname.includes('#') 
      ? pathname.split('#')[1] 
      : 'bookings'
  );

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    // Update URL without page reload
    window.history.pushState({}, '', `#${newTab}`);
  };

  return (
    <div className="container-custom py-8">
      <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-8">
          <TabsTrigger value="bookings">Calendar</TabsTrigger>
          <TabsTrigger value="booking-requests">Direct Bookings</TabsTrigger>
          <TabsTrigger value="hero">Home Page</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="local-area">Local Area</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="guide">Guest Guide</TabsTrigger>
          <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
          <TabsTrigger value="apis">API Keys</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="bookings">
          <AdminBookings />
        </TabsContent>
        <TabsContent value="booking-requests">
          <AdminBookingRequests />
        </TabsContent>
        <TabsContent value="hero">
          <AdminHero />
        </TabsContent>
        <TabsContent value="properties">
          <AdminProperties />
        </TabsContent>
        <TabsContent value="local-area">
          <AdminLocalArea />
        </TabsContent>
        <TabsContent value="images">
          <AdminImages />
        </TabsContent>
        <TabsContent value="guide">
          <AdminGuide />
        </TabsContent>
        <TabsContent value="newsletter">
          <AdminNewsletter />
        </TabsContent>
        <TabsContent value="apis">
          <AdminApis />
        </TabsContent>
        <TabsContent value="users">
          <AdminUsers />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
