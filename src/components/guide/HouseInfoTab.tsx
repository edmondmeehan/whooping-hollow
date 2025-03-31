
import React from 'react';
import { Clock, Zap, Trash } from 'lucide-react';
import GuideSection from '../GuideSection';
import { useLocalStorageSections } from '@/hooks/use-local-storage-sections';

const HouseInfoTab = () => {
  const sections = useLocalStorageSections('house');

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
