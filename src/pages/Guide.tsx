
import React, { useState, useEffect } from 'react';
import GuideBanner from '@/components/GuideBanner';
import GuideTabs from '@/components/GuideTabs';

const Guide = () => {
  const [forceUpdate, setForceUpdate] = useState(0);

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
        <GuideTabs key={`guide-tabs-${forceUpdate}`} />
      </div>
    </div>
  );
};

export default Guide;
