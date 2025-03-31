
import React, { useEffect, useState } from 'react';
import GuideBanner from '@/components/GuideBanner';
import GuideTabs from '@/components/GuideTabs';
import GuideLogin from '@/components/GuideLogin';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Guide = () => {
  const [forceUpdate, setForceUpdate] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    // Check for any authentication token or session storage
    const hasAuthToken = localStorage.getItem('guideAuthToken') !== null;
    setIsLoggedIn(hasAuthToken);
  }, []);

  // Force a reload of guide data when the page loads
  useEffect(() => {
    // This will trigger a re-render of all tabs
    setForceUpdate(prev => prev + 1);
    
    // Force reload data from localStorage
    const event = new StorageEvent('storage', {
      key: 'guideContentSections',
      newValue: localStorage.getItem('guideContentSections'),
      storageArea: localStorage
    });
    window.dispatchEvent(event);
  }, []);

  const handleLogin = (username: string, password: string) => {
    // Check credentials
    if (username === 'whoopinghollow' && password === '26262626') {
      // Set token in localStorage
      localStorage.setItem('guideAuthToken', 'true');
      // Update state
      setIsLoggedIn(true);
      // Show success toast
      toast({
        title: "Login successful",
        description: "Welcome to the Whooping Hollow Guest Guide",
      });
      return true;
    }
    return false;
  };

  return (
    <div>
      <GuideBanner />
      {isLoggedIn ? (
        <div className="container-custom py-8">
          <GuideTabs key={`guide-tabs-${forceUpdate}`} />
        </div>
      ) : (
        <GuideLogin onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Guide;
