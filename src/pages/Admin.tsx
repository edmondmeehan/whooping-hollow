
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ImageIcon, 
  CalendarIcon, 
  BookIcon,
  HomeIcon,
  Link2Icon
} from 'lucide-react';

import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminImages from '@/components/admin/AdminImages';
import AdminBookings from '@/components/admin/AdminBookings';
import AdminGuide from '@/components/admin/AdminGuide';
import AdminProperties from '@/components/admin/AdminProperties';
import AdminApis from '@/components/admin/AdminApis';
import AdminLogin from '@/components/admin/AdminLogin';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  
  const handleLogin = (password: string) => {
    // Simple authentication for demo purposes
    // In a real app, this should be replaced with proper authentication
    if (password === 'admin123') {
      setIsAuthenticated(true);
      toast({
        title: "Login successful",
        description: "Welcome to the admin area",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="images" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span>Images</span>
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
            <TabsTrigger value="apis" className="flex items-center gap-2">
              <Link2Icon className="h-4 w-4" />
              <span>API Keys</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="images" className="bg-white p-6 rounded-lg shadow-sm">
            <AdminImages />
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
          
          <TabsContent value="apis" className="bg-white p-6 rounded-lg shadow-sm">
            <AdminApis />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
