
import React, { useEffect, useState } from 'react';
import GuideBanner from '@/components/GuideBanner';
import GuideTabs from '@/components/GuideTabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

const Guide = () => {
  const [forceUpdate, setForceUpdate] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    // Check for any authentication token or session storage
    // For demonstration, we'll check for a common auth item in localStorage
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

  return (
    <div>
      <GuideBanner />
      <div className="container-custom py-8">
        {!isLoggedIn && (
          <Alert className="mb-6 bg-coastal-50 border-coastal-200">
            <InfoIcon className="h-4 w-4 text-coastal-600" />
            <AlertDescription className="text-coastal-800">
              <p className="mb-2">Hint:</p>
              <p className="mb-1">Network Name:</p>
              <p className="font-mono mb-3">whoopinghollow</p>
              <p className="mb-1">Password:</p>
              <p className="font-mono">26262626</p>
            </AlertDescription>
          </Alert>
        )}
        <GuideTabs key={`guide-tabs-${forceUpdate}`} />
      </div>
    </div>
  );
};

export default Guide;
