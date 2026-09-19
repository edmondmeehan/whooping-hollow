import { SiteContent, defaultSiteContent } from '@/types/site-content';

const STORAGE_KEY = 'whoopingHollowSiteContent';

export const getSiteContent = (): SiteContent => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        return { ...defaultSiteContent, ...parsed };
      }
    }
  } catch (err) {
    console.error('Error reading site content from storage:', err);
  }
  return defaultSiteContent;
};

export const saveSiteContent = (content: SiteContent): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch (err) {
    console.error('Error saving site content to storage:', err);
  }
};

export const resetSiteContent = (): SiteContent => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Error clearing site content:', err);
  }
  return defaultSiteContent;
};
