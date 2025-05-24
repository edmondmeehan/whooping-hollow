
import { useState, useEffect } from 'react';
import { GuideSection } from '@/types/guide';
import { initialGuideSections } from '@/data/initialGuideSections';

const STORAGE_KEY_SECTIONS = 'guideContentSections';

export const useLocalStorageSections = (tabKey: string): GuideSection[] => {
  const [sections, setSections] = useState<GuideSection[]>([]);

  useEffect(() => {
    const loadSections = () => {
      try {
        const storedSections = localStorage.getItem(STORAGE_KEY_SECTIONS);
        let guideSections;
        
        if (storedSections) {
          guideSections = JSON.parse(storedSections);
        } else {
          // Initialize with default data if nothing exists
          guideSections = initialGuideSections;
          localStorage.setItem(STORAGE_KEY_SECTIONS, JSON.stringify(guideSections));
        }
        
        // Return sections for the specific tab, or empty array if tab doesn't exist
        setSections(guideSections[tabKey] || []);
      } catch (error) {
        console.error('Error loading guide sections from localStorage:', error);
        // Fallback to initial data
        setSections(initialGuideSections[tabKey] || []);
      }
    };

    loadSections();

    // Listen for storage changes
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY_SECTIONS) {
        loadSections();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events in case of same-window updates
    const handleCustomStorageChange = () => {
      loadSections();
    };
    
    window.addEventListener('guideContentUpdated', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('guideContentUpdated', handleCustomStorageChange);
    };
  }, [tabKey]);

  return sections;
};
