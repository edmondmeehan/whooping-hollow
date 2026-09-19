import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname } from '@/hooks/use-pathname';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import AdminHero from './AdminHero';
import AdminSiteContent from './AdminSiteContent';
import AdminProperties from './AdminProperties';
import AdminLocalArea from './AdminLocalArea';
import AdminImages from './AdminImages';
import AdminNewsletter from './AdminNewsletter';
import AdminGuide from './AdminGuide';
import AdminBookings from './AdminBookings';
import AdminApis from './AdminApis';
import AdminUsers from './AdminUsers';
import ServiceLinks from './ServiceLinks';
import WelcomeEmailForm from './welcome-email/WelcomeEmailForm';

const AdminDashboard = () => {
  const pathname = usePathname();
  const { adminData } = useAdminAuth();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<string>(
    pathname.includes('#') 
      ? pathname.split('#')[1] 
      : 'bookings'
  );

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    window.history.pushState({}, '', `#${newTab}`);
  };

  return (
    <div className={`container-custom ${isMobile ? "py-3" : "py-8"}`}>
      <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
        <div className="overflow-x-auto -mx-2 px-2">
          <TabsList className={`grid grid-cols-3 ${isMobile ? "text-xs" : ""} md:grid-cols-5 lg:grid-cols-11 mb-4 md:mb-8 w-full md:w-auto`}>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="local-area">Local Area</TabsTrigger>
            <TabsTrigger value="hero">Home Page</TabsTrigger>
            <TabsTrigger value="site-content">Page Content</TabsTrigger>
            <TabsTrigger value="guide">Guest Guide</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
            <TabsTrigger value="apis">API Keys</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="welcome-email">Welcome Email</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="bookings">
          <AdminBookings />
        </TabsContent>
        <TabsContent value="properties">
          <AdminProperties />
        </TabsContent>
        <TabsContent value="local-area">
          <AdminLocalArea />
        </TabsContent>
        <TabsContent value="hero">
          <AdminHero />
        </TabsContent>
        <TabsContent value="site-content">
          <AdminSiteContent />
        </TabsContent>
        <TabsContent value="guide">
          <AdminGuide />
        </TabsContent>
        <TabsContent value="images">
          <AdminImages />
        </TabsContent>
        <TabsContent value="newsletter">
          <AdminNewsletter />
        </TabsContent>
        <TabsContent value="apis">
          <AdminApis />
        </TabsContent>
        <TabsContent value="users">
          <AdminUsers currentUserEmail={adminData?.email || ''} />
        </TabsContent>
        <TabsContent value="welcome-email">
          <WelcomeEmailForm />
        </TabsContent>
      </Tabs>
      <div className={`${isMobile ? "mt-4" : "mt-8"}`}>
        <ServiceLinks />
      </div>
    </div>
  );
};

export default AdminDashboard;
