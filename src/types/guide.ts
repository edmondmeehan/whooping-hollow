
export interface GuideCredentials {
  username: string;
  password: string;
  syncWithWifi: boolean;
}

export interface GuideSection {
  id: string;
  title: string;
  content: string;
}

export type GuideSections = {
  [key: string]: GuideSection[];
};

export type GuideTabKey = 'welcome' | 'house' | 'local' | 'checkout' | 'emergency';

export interface LocalAreaData {
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
}
