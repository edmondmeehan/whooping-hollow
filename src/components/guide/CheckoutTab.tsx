
import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import GuideSection from '../GuideSection';
import { GuideSection as GuideSectionType } from '@/types/guide';

const STORAGE_KEY_SECTIONS = 'guideContentSections';

const CheckoutTab = () => {
  const [sections, setSections] = useState<GuideSectionType[]>([]);

  useEffect(() => {
    // Get sections from localStorage
    const storedSections = localStorage.getItem(STORAGE_KEY_SECTIONS);
    if (storedSections) {
      const parsedSections = JSON.parse(storedSections);
      if (parsedSections.checkout) {
        setSections(parsedSections.checkout);
      }
    }
  }, []);

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <GuideSection key={section.id} title={section.title} icon={<Clock />}>
          <div className="space-y-4">
            <p className="whitespace-pre-line">{section.content}</p>
          </div>
        </GuideSection>
      ))}
    </div>
  );
};

export default CheckoutTab;
