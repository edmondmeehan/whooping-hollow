
import React, { useEffect, useState, useRef } from 'react';
import GuideBanner from '@/components/GuideBanner';
import GuideTabs from '@/components/GuideTabs';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Download, Link as LinkIcon } from 'lucide-react';
import { toPDF } from 'react-to-pdf';

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
      // Updated to use toPDF which returns a Blob directly
      const blob = await toPDF(contentRef, {
        filename: 'whooping-hollow-guest-guide.pdf',
        page: {
          margin: 20,
          format: 'letter',
        },
      });
      
      if (blob) {
        // Create a URL for the PDF blob
        const pdfObjectUrl = URL.createObjectURL(blob);
        setPdfUrl(pdfObjectUrl);
          
        toast({
          title: "PDF Created Successfully",
          description: "Your guest guide PDF is now available for download",
        });
      }
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
          
          {pdfUrl && (
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => window.open(pdfUrl, '_blank')}
              asChild
            >
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                <LinkIcon size={18} />
                View Full PDF
              </a>
            </Button>
          )}
        </div>
        <div ref={contentRef}>
          <GuideTabs key={`guide-tabs-${forceUpdate}`} />
        </div>
      </div>
    </div>
  );
};

export default Guide;
