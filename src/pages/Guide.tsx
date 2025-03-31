
import React, { useState, useEffect } from 'react';
import GuideBanner from '@/components/GuideBanner';
import GuideTabs from '@/components/GuideTabs';
import GuideLogin from '@/components/GuideLogin';
import { useGuideCredentials } from '@/hooks/use-guide-credentials';
import { useToast } from '@/hooks/use-toast';

const Guide = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { guideCredentials } = useGuideCredentials();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user was previously authenticated in this session
    const sessionAuth = sessionStorage.getItem('guideAuthenticated');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    // Adding console log to debug
    console.log('Login attempt:', { 
      input: { username, password },
      stored: guideCredentials
    });
    
    if (username === guideCredentials.username && password === guideCredentials.password) {
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
            <GuideTabs />
          </>
        ) : (
          <GuideLogin onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default Guide;
