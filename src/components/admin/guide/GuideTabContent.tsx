
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import GuideSectionCard from './GuideSectionCard';
import { GuideSection } from '@/types/guide';

interface GuideTabContentProps {
  tabKey: string;
  sections: GuideSection[];
  editingSection: GuideSection | null;
  setEditingSection: React.Dispatch<React.SetStateAction<GuideSection | null>>;
  handleEditSection: (section: GuideSection) => void;
  handleUpdateSection: () => void;
  handleDeleteSection: (sectionId: string) => void;
}

const GuideTabContent = ({
  tabKey,
  sections,
  editingSection,
  setEditingSection,
  handleEditSection,
  handleUpdateSection,
  handleDeleteSection
}: GuideTabContentProps) => {
  return (
    <TabsContent value={tabKey}>
      <div className="space-y-6">
        {sections.map(section => (
          <GuideSectionCard
            key={section.id}
            section={section}
            editingSection={editingSection}
            onEdit={handleEditSection}
            onUpdate={handleUpdateSection}
            onCancelEdit={() => setEditingSection(null)}
            onDelete={handleDeleteSection}
            setEditingSection={setEditingSection}
          />
        ))}
      </div>
    </TabsContent>
  );
};

export default GuideTabContent;
