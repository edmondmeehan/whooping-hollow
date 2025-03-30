
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authenticateAdmin } from '@/services/admin-users-storage';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Define the shape of our authentication data
interface AdminUserData {
  email: string;
  role: string;
  name?: string;
  avatarUrl?: string;
}

// Define the shape of our context
interface AdminAuthContextType {
  isAuthenticated: boolean;
  adminData: AdminUserData | null;
  handleLogin: (adminUserData: AdminUserData) => void;
  handleLogout: (isInactivity?: boolean) => void;
  lastActivity: number;
  setLastActivity: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context with a default value
const AdminAuthContext = createContext<AdminAuthContextType>({
  isAuthenticated: false,
  adminData: null,
  handleLogin: () => {},
  handleLogout: () => {},
  lastActivity: Date.now(),
  setLastActivity: () => {},
});

// Inactivity timeout constant
const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds

// Custom hook to use the auth context
export const useAdminAuth = () => useContext(AdminAuthContext);

// Provider component
export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [adminData, setAdminData] = useState<AdminUserData | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for existing admin session on component mount
  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
      const sessionData = JSON.parse(adminSession);
      const expiryTime = new Date(sessionData.expiry);
      
      // If session hasn't expired, login automatically
      if (expiryTime > new Date()) {
        const user = authenticateAdmin(sessionData.email, sessionData.password);
        if (user) {
          setIsAuthenticated(true);
          setAdminData({
            email: user.email,
            role: user.role,
            name: user.name,
            avatarUrl: user.avatarUrl
          });
          setLastActivity(Date.now());
        }
      } else {
        // Clear expired session
        localStorage.removeItem('adminSession');
      }
    }
  }, []);

  // Handle user activity and inactivity timeout
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

  const handleLogin = (adminUserData: AdminUserData) => {
    setIsAuthenticated(true);
    setAdminData(adminUserData);
    setLastActivity(Date.now());
    toast({
      title: "Login successful",
      description: `Welcome to the admin area, ${adminUserData.name || adminUserData.email}`,
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

  return (
    <AdminAuthContext.Provider 
      value={{ 
        isAuthenticated, 
        adminData, 
        handleLogin, 
        handleLogout, 
        lastActivity, 
        setLastActivity 
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
