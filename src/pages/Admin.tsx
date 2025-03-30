
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ImageIcon, 
  CalendarIcon, 
  BookIcon,
  HomeIcon,
  Link2Icon,
  LayoutIcon,
  Shield,
  Users
} from 'lucide-react';

import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminImages from '@/components/admin/AdminImages';
import AdminBookings from '@/components/admin/AdminBookings';
import AdminGuide from '@/components/admin/AdminGuide';
import AdminProperties from '@/components/admin/AdminProperties';
import AdminApis from '@/components/admin/AdminApis';
import AdminHero from '@/components/admin/AdminHero';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminUsers from '@/components/admin/AdminUsers';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';

const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [adminData, setAdminData] = useState<{ email: string; role: string } | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Handle user activity 
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const resetTimer = () => {
      setLastActivity(Date.now());
    };
    
    // Attach event listeners to track user activity
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);
    
    // Check for inactivity
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastActivity > INACTIVITY_TIMEOUT) {
        // Log out due to inactivity
        handleLogout(true);
      }
    }, 60000); // Check every minute
    
    return () => {
      // Clean up event listeners
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      clearInterval(interval);
    };
  }, [isAuthenticated, lastActivity]);
  
  useEffect(() => {
    // Check for existing admin session on component mount
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
      const sessionData = JSON.parse(adminSession);
      const expiryTime = new Date(sessionData.expiry);
      
      // If session hasn't expired, login automatically
      if (expiryTime > new Date()) {
        setIsAuthenticated(true);
        setAdminData({
          email: sessionData.email,
          role: sessionData.role
        });
        setLastActivity(Date.now());
      } else {
        // Clear expired session
        localStorage.removeItem('adminSession');
      }
    }
  }, []);
  
  const handleLogin = (adminUserData: { email: string; role: string }) => {
    setIsAuthenticated(true);
    setAdminData(adminUserData);
    setLastActivity(Date.now());
    toast({
      title: "Login successful",
      description: `Welcome to the admin area, ${adminUserData.email}`,
    });
  };

  const handleLogout = (isInactivity = false) => {
    localStorage.removeItem('adminSession');
    setIsAuthenticated(false);
    setAdminData(null);
    
    if (isInactivity) {
      toast({
        title: "Session expired",
        description: "You have been logged out due to inactivity",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged out",
        description: "You have been logged out of the admin area",
      });
    }
    
    // Redirect to home page after logout
    navigate('/');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar onLogout={() => handleLogout(false)} adminEmail={adminData?.email} />
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
          <TabsList className="grid grid-cols-7 mb-8">
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
          
          <TabsContent value="apis" className="bg-white p-6 rounded-lg shadow-sm">
            <AdminApis />
          </TabsContent>
          
          <TabsContent value="users" className="bg-white p-6 rounded-lg shadow-sm">
            <AdminUsers currentUserEmail={adminData?.email || ''} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
