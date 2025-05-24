
import { useState, useEffect } from 'react';
import { GuideSection, GuideSections } from '@/types/guide';
import { useToast } from './use-toast';
import { initialGuideSections } from '@/data/initialGuideSections';

const STORAGE_KEY_SECTIONS = 'guideContentSections';

const dispatchGuideContentUpdate = () => {
  // Dispatch custom event for same-window updates
  window.dispatchEvent(new CustomEvent('guideContentUpdated'));
  
  // Also dispatch storage event manually for cross-component communication
  window.dispatchEvent(new StorageEvent('storage', {
    key: STORAGE_KEY_SECTIONS,
    newValue: localStorage.getItem(STORAGE_KEY_SECTIONS),
    storageArea: localStorage
  }));
};

export const useGuideSections = () => {
  const [guideSections, setGuideSections] = useState<GuideSections>(() => {
    // Load from localStorage if available, otherwise use initial data
    try {
      const storedSections = localStorage.getItem(STORAGE_KEY_SECTIONS);
      if (storedSections) {
        return JSON.parse(storedSections);
      }
    } catch (error) {
      console.error('Error loading guide sections from localStorage:', error);
    }
    
    // Initialize localStorage with default data and return it
    localStorage.setItem(STORAGE_KEY_SECTIONS, JSON.stringify(initialGuideSections));
    return initialGuideSections;
  });
  
  const [activeTab, setActiveTab] = useState('welcome');
  const [editingSection, setEditingSection] = useState<GuideSection | null>(null);
  const { toast } = useToast();

  // Save to localStorage whenever guideSections changes and dispatch update event
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SECTIONS, JSON.stringify(guideSections));
    dispatchGuideContentUpdate();
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
