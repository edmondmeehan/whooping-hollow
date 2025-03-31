
import React, { useEffect, useState } from 'react';
import { Map, Utensils, Car } from 'lucide-react';
import GuideSection from '../GuideSection';
import { GuideSection as GuideSectionType } from '@/types/guide';

const STORAGE_KEY_SECTIONS = 'guideContentSections';

const LocalAreaTab = () => {
  const [sections, setSections] = useState<GuideSectionType[]>([]);

  useEffect(() => {
    // Get sections from localStorage
    const storedSections = localStorage.getItem(STORAGE_KEY_SECTIONS);
    if (storedSections) {
      const parsedSections = JSON.parse(storedSections);
      if (parsedSections.local) {
        setSections(parsedSections.local);
      }
    }
  }, []);

  // Render icons based on section title
  const getSectionIcon = (title: string) => {
    if (title.toLowerCase().includes('restaurant') || title.toLowerCase().includes('food')) return <Utensils />;
    if (title.toLowerCase().includes('transportation') || title.toLowerCase().includes('parking')) return <Car />;
    return <Map />;
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

export default LocalAreaTab;
