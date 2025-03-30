
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Waves, Anchor, MapPin, Music, Info } from 'lucide-react';

interface LocalAreaTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  children: React.ReactNode;
}

const LocalAreaTabs: React.FC<LocalAreaTabsProps> = ({ activeTab, onTabChange, children }) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid grid-cols-5 mb-8">
        <TabsTrigger value="east-hampton" className="flex items-center gap-2">
          <Waves className="h-4 w-4" />
          <span>East Hampton</span>
        </TabsTrigger>
        <TabsTrigger value="sag-harbor" className="flex items-center gap-2">
          <Anchor className="h-4 w-4" />
          <span>Sag Harbor</span>
        </TabsTrigger>
        <TabsTrigger value="nearby-favorites" className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>Nearby Favorites</span>
        </TabsTrigger>
        <TabsTrigger value="summer-events" className="flex items-center gap-2">
          <Music className="h-4 w-4" />
          <span>Summer Events</span>
        </TabsTrigger>
        <TabsTrigger value="insider-tips" className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          <span>Insider Tips</span>
        </TabsTrigger>
      </TabsList>
      
      {children}
    </Tabs>
  );
};

export default LocalAreaTabs;
