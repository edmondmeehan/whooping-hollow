
import React from 'react';
import { Clock, CheckCheck, ClipboardCheck } from 'lucide-react';
import GuideSection from '../GuideSection';
import { useLocalStorageSections } from '@/hooks/use-local-storage-sections';

const CheckoutTab = () => {
  const sections = useLocalStorageSections('checkout');

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
