
import React, { useEffect, useState, useRef } from 'react';
import GuideBanner from '@/components/GuideBanner';
import GuideTabs from '@/components/GuideTabs';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toPDF } from 'react-to-pdf';

const Guide = () => {
  const [forceUpdate, setForceUpdate] = useState(0);
  const defaultProperty = '26-whooping-hollow';
  const contentRef = useRef(null);

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

  const handleDownloadPDF = () => {
    toast({
      title: "Preparing PDF...",
      description: "Your guest guide PDF is being generated",
    });
    
    const options = {
      filename: 'whooping-hollow-guest-guide.pdf',
      page: {
        margin: 20,
        format: 'letter',
      },
    };

    toPDF(contentRef, options)
      .then(() => {
        toast({
          title: "Download Complete",
          description: "Your guest guide has been downloaded",
        });
      })
      .catch(err => {
        console.error("PDF generation error:", err);
        toast({
          title: "Error",
          description: "Failed to generate the PDF. Please try again.",
          variant: "destructive",
        });
      });
  };

  return (
    <div>
      <GuideBanner />
      <div className="container-custom py-8">
        <div className="flex justify-end mb-6">
          <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
            <Download size={18} />
            Download Guide PDF
          </Button>
        </div>
        <div ref={contentRef}>
          <GuideTabs key={`guide-tabs-${forceUpdate}`} />
        </div>
      </div>
    </div>
  );
};

export default Guide;
