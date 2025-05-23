
import React, { useEffect, useState, useRef } from 'react';
import GuideBanner from '@/components/GuideBanner';
import GuideTabs from '@/components/GuideTabs';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Download, Link as LinkIcon } from 'lucide-react';
import generatePDF from 'react-to-pdf';

const Guide = () => {
  const [forceUpdate, setForceUpdate] = useState(0);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
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

  const handleDownloadPDF = async () => {
    toast({
      title: "Preparing PDF...",
      description: "Your guest guide PDF is being generated",
    });
    
    try {
      // Use the default import from react-to-pdf
      await generatePDF(contentRef, {
        filename: 'whooping-hollow-guest-guide.pdf',
        page: {
          margin: 20,
          format: 'letter',
        },
      });
      
      toast({
        title: "PDF Downloaded Successfully",
        description: "Your guest guide PDF has been downloaded",
      });
    } catch (err) {
      console.error("PDF generation error:", err);
      toast({
        title: "Error",
        description: "Failed to generate the PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <GuideBanner />
      <div className="container-custom py-8">
        <div className="flex flex-col sm:flex-row justify-end gap-4 mb-6">
          <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
            <Download size={18} />
            Generate PDF
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
