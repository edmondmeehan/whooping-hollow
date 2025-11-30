
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
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
  user: User | null;
  session: Session | null;
  handleLogin: (adminUserData: AdminUserData) => void;
  handleLogout: (isInactivity?: boolean) => void;
  lastActivity: number;
  setLastActivity: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context with a default value
const AdminAuthContext = createContext<AdminAuthContextType>({
  isAuthenticated: false,
  adminData: null,
  user: null,
  session: null,
  handleLogin: () => {},
  handleLogout: () => {},
  lastActivity: Date.now(),
  setLastActivity: () => {},
});

// Inactivity timeout disabled for admin convenience
// Sessions will persist until manually logged out
const INACTIVITY_TIMEOUT = Infinity; // No automatic timeout

// Custom hook to use the auth context
export const useAdminAuth = () => useContext(AdminAuthContext);

// Provider component
export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [adminData, setAdminData] = useState<AdminUserData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user has admin role
  const checkAdminRole = async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .single();
      
      return !error && !!data;
    } catch {
      return false;
    }
  };

  // Set up auth state listener and check for existing session
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer the admin role check
          setTimeout(async () => {
            const isAdmin = await checkAdminRole(session.user.id);
            
            if (isAdmin) {
              setIsAuthenticated(true);
              setAdminData({
                email: session.user.email || '',
                role: 'admin',
                name: session.user.user_metadata?.name,
                avatarUrl: session.user.user_metadata?.avatar_url
              });
              setLastActivity(Date.now());
            } else {
              // User is authenticated but not an admin
              setIsAuthenticated(false);
              setAdminData(null);
              toast({
                title: "Access Denied",
                description: "You do not have admin privileges",
                variant: "destructive",
              });
              await supabase.auth.signOut();
            }
          }, 0);
        } else {
          setIsAuthenticated(false);
          setAdminData(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const isAdmin = await checkAdminRole(session.user.id);
        
        if (isAdmin) {
          setIsAuthenticated(true);
          setAdminData({
            email: session.user.email || '',
            role: 'admin',
            name: session.user.user_metadata?.name,
            avatarUrl: session.user.user_metadata?.avatar_url
          });
          setLastActivity(Date.now());
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  // Inactivity timeout disabled - sessions persist until manual logout
  // Keeping activity tracking for potential future use
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const resetTimer = () => {
      setLastActivity(Date.now());
    };
    
    // Track user activity (for analytics/future use)
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);
    
    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, [isAuthenticated]);

  const handleLogin = (adminUserData: AdminUserData) => {
    setIsAuthenticated(true);
    setAdminData(adminUserData);
    setLastActivity(Date.now());
    toast({
      title: "Login successful",
      description: `Welcome to the admin area, ${adminUserData.name || adminUserData.email}`,
    });
  };

  const handleLogout = async (isInactivity = false) => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setAdminData(null);
    setUser(null);
    setSession(null);
    
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
        user,
        session,
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
