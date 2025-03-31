
import React, { useEffect, useState } from 'react';
import { Clock, Zap, Trash } from 'lucide-react';
import GuideSection from '../GuideSection';
import { GuideSection as GuideSectionType } from '@/types/guide';

const STORAGE_KEY_SECTIONS = 'guideContentSections';

const HouseInfoTab = () => {
  const [sections, setSections] = useState<GuideSectionType[]>([]);

  useEffect(() => {
    // Get sections from localStorage
    const storedSections = localStorage.getItem(STORAGE_KEY_SECTIONS);
    if (storedSections) {
      const parsedSections = JSON.parse(storedSections);
      if (parsedSections.house) {
        setSections(parsedSections.house);
      }
    }
  }, []);

  // Render icons based on section title
  const getSectionIcon = (title: string) => {
    if (title.toLowerCase().includes('check-in')) return <Clock />;
    if (title.toLowerCase().includes('appliance') || title.toLowerCase().includes('thermostat')) return <Zap />;
    if (title.toLowerCase().includes('trash')) return <Trash />;
    return <Zap />;
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

export default HouseInfoTab;
