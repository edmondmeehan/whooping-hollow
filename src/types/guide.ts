
export interface GuideCredentials {
  username: string;
  password: string;
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
