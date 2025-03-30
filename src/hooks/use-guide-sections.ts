import { useState, useEffect } from 'react';
import { GuideSection, GuideSections } from '@/types/guide';
import { useToast } from './use-toast';
import { initialGuideSections } from '@/data/initialGuideSections';

const STORAGE_KEY_SECTIONS = 'guideContentSections';

export const useGuideSections = () => {
  const [guideSections, setGuideSections] = useState<GuideSections>(() => {
    // Load from localStorage if available
    const storedSections = localStorage.getItem(STORAGE_KEY_SECTIONS);
    return storedSections ? JSON.parse(storedSections) : initialGuideSections;
  });
  
  const [activeTab, setActiveTab] = useState('welcome');
  const [editingSection, setEditingSection] = useState<GuideSection | null>(null);
  const { toast } = useToast();

  // Save to localStorage whenever guideSections changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SECTIONS, JSON.stringify(guideSections));
  }, [guideSections]);

  const handleEditSection = (section: GuideSection) => {
    setEditingSection(section);
  };

  const handleUpdateSection = () => {
    if (!editingSection) return;
    
    const updatedSections = { ...guideSections };
    const sectionIndex = updatedSections[activeTab].findIndex(s => s.id === editingSection.id);
    
    if (sectionIndex !== -1) {
      updatedSections[activeTab][sectionIndex] = editingSection;
      setGuideSections(updatedSections);
      setEditingSection(null);
      
      toast({
        title: 'Section Updated',
        description: 'Guide section has been updated successfully',
      });
    }
  };

  const handleAddSection = () => {
    const newSection: GuideSection = {
      id: `${activeTab}-${Date.now()}`,
      title: 'New Section',
      content: 'Enter content here'
    };
    
    const updatedSections = { ...guideSections };
    updatedSections[activeTab] = [...updatedSections[activeTab], newSection];
    setGuideSections(updatedSections);
    
    toast({
      title: 'Section Added',
      description: 'New guide section has been added',
    });
  };

  const handleDeleteSection = (sectionId: string) => {
    const updatedSections = { ...guideSections };
    updatedSections[activeTab] = updatedSections[activeTab].filter(s => s.id !== sectionId);
    setGuideSections(updatedSections);
    
    toast({
      title: 'Section Deleted',
      description: 'Guide section has been deleted',
    });
  };

  return {
    guideSections,
    activeTab,
    editingSection,
    setActiveTab,
    setEditingSection,
    handleEditSection,
    handleUpdateSection,
    handleAddSection,
    handleDeleteSection
  };
};
