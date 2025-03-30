
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import GuideBanner from '../components/GuideBanner';
import GuideTabs from '../components/GuideTabs';
import Footer from '../components/Footer';
import GuideLogin from '../components/GuideLogin';
import { useToast } from '@/hooks/use-toast';
import { GuideCredentials } from '@/types/guide';

// Default guide access credentials - in a real app, these would be stored securely
const defaultGuideCredentials: GuideCredentials = {
  username: 'guest',
  password: 'guide123'
};

const Guide = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState<GuideCredentials>(defaultGuideCredentials);
  const { toast } = useToast();
  
  // Check for previously authenticated session and get credentials
  useEffect(() => {
    const guideAuth = localStorage.getItem('guideAuth');
    if (guideAuth === 'true') {
      setIsAuthenticated(true);
    }
    
    // Load credentials if they exist
    const savedCredentials = localStorage.getItem('guideCredentials');
    if (savedCredentials) {
      try {
        setCredentials(JSON.parse(savedCredentials));
      } catch (e) {
        console.error('Error parsing credentials:', e);
      }
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    // In a real app, this would use secure authentication
    if (username === credentials.username && 
        password === credentials.password) {
      setIsAuthenticated(true);
      localStorage.setItem('guideAuth', 'true');
      toast({
        title: "Login successful",
        description: "Welcome to the guest guide",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Incorrect username or password",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <GuideLogin onLogin={handleLogin} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <GuideBanner />
      <div className="container-custom py-12">
        <GuideTabs />
      </div>
      <Footer />
    </div>
  );
};

export default Guide;
