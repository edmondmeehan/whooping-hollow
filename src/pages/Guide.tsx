
import React, { useEffect, useState } from 'react';
import GuideBanner from '@/components/GuideBanner';
import GuideTabs from '@/components/GuideTabs';
import { toast } from '@/hooks/use-toast';

const Guide = () => {
  const [forceUpdate, setForceUpdate] = useState(0);
  const defaultProperty = '26-whooping-hollow';

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
    
    // Show welcome toast
    toast({
      title: "Welcome to the Guest Guide",
      description: "Browse through the tabs to find information about your stay",
    });
  }, []);

  return (
    <div>
      <GuideBanner />
      <div className="container-custom py-8">
        <GuideTabs key={`guide-tabs-${forceUpdate}`} />
      </div>
    </div>
  );
};

export default Guide;
