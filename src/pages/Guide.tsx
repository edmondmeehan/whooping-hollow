
import React, { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import StickyHeader from '@/components/StickyHeader';
import GuideTabs from '@/components/GuideTabs';
import Footer from '@/components/Footer';
import { toast } from '@/hooks/use-toast';
import { BookOpen } from 'lucide-react';
import { initialGuideSections } from '@/data/initialGuideSections';

const Guide = () => {
  const [forceUpdate, setForceUpdate] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    const STORAGE_KEY_SECTIONS = 'guideContentSections';
    const storedSections = localStorage.getItem(STORAGE_KEY_SECTIONS);
    
    if (!storedSections) {
      localStorage.setItem(STORAGE_KEY_SECTIONS, JSON.stringify(initialGuideSections));
    }
    
    setForceUpdate(prev => prev + 1);
    
    setTimeout(() => {
      const event = new StorageEvent('storage', {
        key: STORAGE_KEY_SECTIONS,
        newValue: localStorage.getItem(STORAGE_KEY_SECTIONS),
        storageArea: localStorage
      });
      window.dispatchEvent(event);
      window.dispatchEvent(new CustomEvent('guideContentUpdated'));
    }, 100);
    
    toast({
      title: "Welcome to the Guest Guide",
      description: "Browse through the tabs to find information about your stay",
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
        <div className="absolute inset-0 bg-[url('/east-hampton-beach.webp')] bg-cover bg-center opacity-10"></div>
        <div className="relative container-custom py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 backdrop-blur-sm rounded-full mb-6">
              <BookOpen className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Guest Guide
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed max-w-3xl mx-auto">
              Everything you need to know for a comfortable and enjoyable stay at The Ranch Modern.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-background">
        <div className="container-custom py-12 md:py-16">
          <div ref={contentRef} className="max-w-6xl mx-auto">
            <GuideTabs key={`guide-tabs-${forceUpdate}`} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Guide;
