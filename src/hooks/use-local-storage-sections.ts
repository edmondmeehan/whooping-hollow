
import { useState, useEffect } from 'react';
import { GuideSection } from '@/types/guide';

const STORAGE_KEY_SECTIONS = 'guideContentSections';

export const useLocalStorageSections = (sectionKey: string) => {
  const [sections, setSections] = useState<GuideSection[]>([]);

  useEffect(() => {
    // Function to load sections from localStorage
    const loadSections = () => {
      const storedSections = localStorage.getItem(STORAGE_KEY_SECTIONS);
      if (storedSections) {
        const parsedSections = JSON.parse(storedSections);
        if (parsedSections[sectionKey]) {
          setSections(parsedSections[sectionKey]);
        }
      }
    };

    // Load sections initially
    loadSections();

    // Set up an interval to check for updates (useful for same-window updates)
    const checkInterval = setInterval(loadSections, 1000);

    // Set up storage event listener for cross-window updates
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY_SECTIONS) {
        loadSections();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Clean up
    return () => {
      clearInterval(checkInterval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [sectionKey]);

  return sections;
};
