
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import GuideSection from '../GuideSection';
import { useLocalStorageSections } from '@/hooks/use-local-storage-sections';

const EmergencyTab = () => {
  const sections = useLocalStorageSections('emergency');

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <GuideSection key={section.id} title={section.title} icon={<AlertTriangle />}>
          <div className="space-y-4">
            <p className="whitespace-pre-line">{section.content}</p>
          </div>
        </GuideSection>
      ))}
    </div>
  );
};

export default EmergencyTab;
