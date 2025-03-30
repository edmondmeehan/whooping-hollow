
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';
import { LocalAreaData } from '../types/local-area';
import { getLocalAreaData, saveLocalAreaData } from '../services/local-area-storage';

export { LocalAreaData } from '../types/local-area';

export const useLocalArea = () => {
  const [localAreaData, setLocalAreaData] = useState<LocalAreaData>(() => getLocalAreaData());
  const { toast } = useToast();

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveLocalAreaData(localAreaData);
  }, [localAreaData]);

  // Update East Hampton data
  const updateEastHampton = (eastHamptonData: typeof localAreaData.eastHampton) => {
    setLocalAreaData(prev => ({
      ...prev,
      eastHampton: eastHamptonData
    }));
  };

  // Update Sag Harbor data
  const updateSagHarbor = (sagHarborData: typeof localAreaData.sagHarbor) => {
    setLocalAreaData(prev => ({
      ...prev,
      sagHarbor: sagHarborData
    }));
  };

  // Update Nearby Favorites data
  const updateNearbyFavorites = (nearbyFavoritesData: typeof localAreaData.nearbyFavorites) => {
    setLocalAreaData(prev => ({
      ...prev,
      nearbyFavorites: nearbyFavoritesData
    }));
  };

  // Update Summer Events data
  const updateSummerEvents = (summerEventsData: typeof localAreaData.summerEvents) => {
    setLocalAreaData(prev => ({
      ...prev,
      summerEvents: summerEventsData
    }));
  };

  // Update Insider Tips data
  const updateInsiderTips = (insiderTipsData: typeof localAreaData.insiderTips) => {
    setLocalAreaData(prev => ({
      ...prev,
      insiderTips: insiderTipsData
    }));
  };

  return {
    localAreaData,
    updateEastHampton,
    updateSagHarbor,
    updateNearbyFavorites,
    updateSummerEvents,
    updateInsiderTips
  };
};
