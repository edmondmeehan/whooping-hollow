import { useState, useCallback } from 'react';
import { SiteContent } from '@/types/site-content';
import { getSiteContent, saveSiteContent, resetSiteContent } from '@/services/site-content-storage';

export const useSiteContent = () => {
  const [content, setContent] = useState<SiteContent>(() => getSiteContent());

  const updateContent = useCallback((next: SiteContent) => {
    setContent(next);
    saveSiteContent(next);
  }, []);

  const resetContent = useCallback(() => {
    const defaults = resetSiteContent();
    setContent(defaults);
    return defaults;
  }, []);

  return { content, setContent, updateContent, resetContent };
};
