
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ImageIcon, 
  CalendarIcon, 
  BookIcon,
  HomeIcon,
  Link2Icon,
  LayoutIcon,
  Shield,
  Users,
  Map,
  Mail
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AdminImages from '@/components/admin/AdminImages';
import AdminBookings from '@/components/admin/AdminBookings';
import AdminGuide from '@/components/admin/AdminGuide';
import AdminProperties from '@/components/admin/AdminProperties';
import AdminApis from '@/components/admin/AdminApis';
import AdminHero from '@/components/admin/AdminHero';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminLocalArea from '@/components/admin/AdminLocalArea';
import AdminNewsletter from '@/components/admin/AdminNewsletter';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

const AdminDashboard: React.FC = () => {
  const { adminData } = useAdminAuth();

  return (
    <div className="container-custom py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
          <Shield className="h-4 w-4 mr-1" />
          <span>Secure Admin Area</span>
        </div>
      </div>
      
      <Alert className="mb-6 bg-blue-50 border-blue-200">
        <AlertDescription className="text-blue-700">
          Your session will expire after 15 minutes of inactivity. Any changes will be lost if not saved.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="images" className="w-full">
        <TabsList className="grid grid-cols-9 mb-8">
          <TabsTrigger value="images" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            <span>Images</span>
          </TabsTrigger>
          <TabsTrigger value="hero" className="flex items-center gap-2">
            <LayoutIcon className="h-4 w-4" />
            <span>Hero</span>
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            <span>Bookings</span>
          </TabsTrigger>
          <TabsTrigger value="guide" className="flex items-center gap-2">
            <BookIcon className="h-4 w-4" />
            <span>Guide Content</span>
          </TabsTrigger>
          <TabsTrigger value="properties" className="flex items-center gap-2">
            <HomeIcon className="h-4 w-4" />
            <span>Properties</span>
          </TabsTrigger>
          <TabsTrigger value="local-area" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            <span>Local Area</span>
          </TabsTrigger>
          <TabsTrigger value="newsletter" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>Newsletter</span>
          </TabsTrigger>
          <TabsTrigger value="apis" className="flex items-center gap-2">
            <Link2Icon className="h-4 w-4" />
            <span>API Keys</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Users</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="images" className="bg-white p-6 rounded-lg shadow-sm">
          <AdminImages />
        </TabsContent>
        
        <TabsContent value="hero" className="bg-white p-6 rounded-lg shadow-sm">
          <AdminHero />
        </TabsContent>
        
        <TabsContent value="bookings" className="bg-white p-6 rounded-lg shadow-sm">
          <AdminBookings />
        </TabsContent>
        
        <TabsContent value="guide" className="bg-white p-6 rounded-lg shadow-sm">
          <AdminGuide />
        </TabsContent>
        
        <TabsContent value="properties" className="bg-white p-6 rounded-lg shadow-sm">
          <AdminProperties />
        </TabsContent>
        
        <TabsContent value="local-area" className="bg-white p-6 rounded-lg shadow-sm">
          <AdminLocalArea />
        </TabsContent>
        
        <TabsContent value="newsletter" className="bg-white p-6 rounded-lg shadow-sm">
          <AdminNewsletter />
        </TabsContent>
        
        <TabsContent value="apis" className="bg-white p-6 rounded-lg shadow-sm">
          <AdminApis />
        </TabsContent>
        
        <TabsContent value="users" className="bg-white p-6 rounded-lg shadow-sm">
          <AdminUsers currentUserEmail={adminData?.email || ''} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
