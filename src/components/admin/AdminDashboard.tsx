import React, { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import AdminHero from './AdminHero';
import AdminSiteContent from './AdminSiteContent';
import AdminProperties from './AdminProperties';
import AdminLocalArea from './AdminLocalArea';
import AdminImages from './AdminImages';
import AdminNewsletter from './AdminNewsletter';
import AdminGuide from './AdminGuide';
import AdminBookings from './AdminBookings';
import AdminAvailability from './AdminAvailability';
import AdminApis from './AdminApis';
import AdminUsers from './AdminUsers';
import ServiceLinks from './ServiceLinks';
import WelcomeEmailForm from './welcome-email/WelcomeEmailForm';
import AdminSidebar, { adminSections } from './AdminSidebar';
import AdminNavbar from './AdminNavbar';

const AdminDashboard = () => {
  const { adminData, handleLogout } = useAdminAuth();
  const initialTab = window.location.hash.replace('#', '');
  const [activeTab, setActiveTab] = useState<string>(
    adminSections.some((section) => section.value === initialTab) ? initialTab : 'bookings'
  );

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    window.history.replaceState({}, '', `#${newTab}`);
  };

  const activeSection = adminSections.find((section) => section.value === activeTab);

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset className="min-w-0 bg-admin-bg">
          <AdminNavbar
            title={activeSection?.label || 'Admin'}
            onLogout={() => handleLogout(false)}
            adminEmail={adminData?.email}
            adminName={adminData?.name}
            adminAvatar={adminData?.avatarUrl}
          />
          <main className="w-full px-4 py-6 sm:px-6 lg:px-10 lg:py-9">
            <div className="mx-auto max-w-7xl admin-content">
        <TabsContent value="bookings">
          <AdminBookings />
        </TabsContent>
        <TabsContent value="availability">
          <AdminAvailability />
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
        <TabsContent value="services">
          <ServiceLinks />
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
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </Tabs>
  );
};

export default AdminDashboard;
