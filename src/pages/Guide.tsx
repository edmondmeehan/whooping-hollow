
import React, { useState, useEffect } from 'react';
import GuideBanner from '@/components/GuideBanner';
import GuideTabs from '@/components/GuideTabs';
import GuideLogin from '@/components/GuideLogin';
import { useToast } from '@/hooks/use-toast';

const Guide = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    // Check if user was previously authenticated in this session
    const sessionAuth = sessionStorage.getItem('guideAuthenticated');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Force a reload of guide data when the page loads
  useEffect(() => {
    if (isAuthenticated) {
      // This will trigger a re-render of all tabs
      setForceUpdate(prev => prev + 1);
      
      // Force reload data from localStorage
      const event = new StorageEvent('storage', {
        key: 'guideContentSections',
        newValue: localStorage.getItem('guideContentSections'),
        storageArea: localStorage
      });
      window.dispatchEvent(event);
    }
  }, [isAuthenticated]);

  const handleLogin = (username: string, password: string) => {
    // Hardcoded credentials check
    if (username === 'whoopinghollow' && password === '26262626') {
      setIsAuthenticated(true);
      // Store authentication state for this session
      sessionStorage.setItem('guideAuthenticated', 'true');
      
      toast({
        title: "Login Successful",
        description: "Welcome to the Guest Guide",
      });
      
      return true;
    }
    
    toast({
      title: "Login Failed",
      description: "Invalid username or password",
      variant: "destructive",
    });
    
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('guideAuthenticated');
    
    toast({
      title: "Logged Out",
      description: "You have been logged out of the Guest Guide",
    });
  };

  return (
    <div>
      <GuideBanner />
      <div className="container-custom py-8">
        {isAuthenticated ? (
          <>
            <div className="flex justify-end mb-6">
              <button 
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-coastal-600 transition-colors"
              >
                Logout
              </button>
            </div>
            <GuideTabs key={`guide-tabs-${forceUpdate}`} />
          </>
        ) : (
          <GuideLogin onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default Guide;
