
import React, { useEffect, useState } from 'react';
import { Clock, CheckCheck, ClipboardCheck } from 'lucide-react';
import GuideSection from '../GuideSection';
import { GuideSection as GuideSectionType } from '@/types/guide';

const STORAGE_KEY_SECTIONS = 'guideContentSections';

const CheckoutTab = () => {
  const [sections, setSections] = useState<GuideSectionType[]>([]);

  useEffect(() => {
    // Get sections from localStorage and refresh when localStorage changes
    const loadSections = () => {
      const storedSections = localStorage.getItem(STORAGE_KEY_SECTIONS);
      if (storedSections) {
        const parsedSections = JSON.parse(storedSections);
        if (parsedSections.checkout) {
          setSections(parsedSections.checkout);
        }
      }
    };

    // Load sections initially
    loadSections();

    // Set up a storage event listener to detect changes
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY_SECTIONS) {
        loadSections();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Render icons based on section title
  const getSectionIcon = (title: string) => {
    if (title.toLowerCase().includes('instructions')) return <ClipboardCheck />;
    if (title.toLowerCase().includes('complete')) return <CheckCheck />;
    return <Clock />;
  };

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <GuideSection key={section.id} title={section.title} icon={getSectionIcon(section.title)}>
          <div className="space-y-4">
            <p className="whitespace-pre-line">{section.content}</p>
          </div>
        </GuideSection>
      ))}
    </div>
  );
};

export default CheckoutTab;
