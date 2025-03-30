
// Types for local area data
export type LocalAreaData = {
  eastHampton: {
    title: string;
    description: string;
    highlights: string[];
    imageUrl: string;
  };
  sagHarbor: {
    title: string;
    description: string;
    highlights: string[];
    imageUrl: string;
  };
  nearbyFavorites: {
    title: string;
    items: Array<{
      name: string;
      description: string;
      distance: string;
    }>;
  };
  summerEvents: {
    title: string;
    description: string;
    events: Array<{
      name: string;
      description: string;
      dates: string;
      activities: string;
    }>;
  };
  insiderTips: {
    title: string;
    tips: string[];
  };
};
