
import React, { useState, useEffect } from 'react';
import GuideBanner from '@/components/GuideBanner';
import GuideTabs from '@/components/GuideTabs';
import GuideLogin from '@/components/GuideLogin';
import { useGuideCredentials } from '@/hooks/use-guide-credentials';

const Guide = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { guideCredentials } = useGuideCredentials();

  useEffect(() => {
    // Check if user was previously authenticated in this session
    const sessionAuth = sessionStorage.getItem('guideAuthenticated');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    if (username === guideCredentials.username && password === guideCredentials.password) {
      setIsAuthenticated(true);
      // Store authentication state for this session
      sessionStorage.setItem('guideAuthenticated', 'true');
      return true;
    }
    return false;
  };

  return (
    <div>
      <GuideBanner />
      <div className="container-custom py-8">
        {isAuthenticated ? (
          <GuideTabs />
        ) : (
          <GuideLogin onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default Guide;
