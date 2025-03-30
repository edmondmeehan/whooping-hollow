
import React, { useState, useEffect } from 'react';
import GuideBanner from '@/components/GuideBanner';
import GuideTabs from '@/components/GuideTabs';
import GuideLogin from '@/components/GuideLogin';
import { GuideCredentials } from '@/types/guide';

const STORAGE_KEY_CREDENTIALS = 'guideCredentials';

const Guide = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user was previously authenticated in this session
    const sessionAuth = sessionStorage.getItem('guideAuthenticated');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    // Get credentials from localStorage
    const storedCredentials = localStorage.getItem(STORAGE_KEY_CREDENTIALS);
    const credentials: GuideCredentials = storedCredentials 
      ? JSON.parse(storedCredentials) 
      : { username: 'whoppinghollow', password: '262626' };
    
    if (username === credentials.username && password === credentials.password) {
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
