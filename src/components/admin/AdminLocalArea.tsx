import React, { useState } from 'react';
import { useLocalArea } from '@/hooks/use-local-area';
import { TabsContent } from '@/components/ui/tabs';
import LocalAreaTabs from './local-area/LocalAreaTabs';
import EastHamptonForm from './local-area/EastHamptonForm';
import SagHarborForm from './local-area/SagHarborForm';
import NearbyFavoritesForm from './local-area/NearbyFavoritesForm';
import SummerEventsForm from './local-area/SummerEventsForm';
import InsiderTipsForm from './local-area/InsiderTipsForm';
import { FormProvider } from 'react-hook-form';

const AdminLocalArea: React.FC = () => {
  const { 
    localAreaData, 
    updateEastHampton, 
    updateSagHarbor, 
    updateNearbyFavorites, 
    updateSummerEvents, 
    updateInsiderTips 
  } = useLocalArea();
  
  const [activeTab, setActiveTab] = useState('east-hampton');
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Local Area Content Management</h2>
      <p className="text-gray-600 mb-6">
        Edit the content that appears on the Local Area page. Changes will be immediately visible to visitors.
      </p>
      
      <LocalAreaTabs activeTab={activeTab} onTabChange={setActiveTab}>
        <TabsContent value="east-hampton" className="space-y-4">
          <EastHamptonForm 
            data={localAreaData.eastHampton} 
            onUpdate={updateEastHampton} 
          />
        </TabsContent>
        
        <TabsContent value="sag-harbor" className="space-y-4">
          <SagHarborForm 
            data={localAreaData.sagHarbor} 
            onUpdate={updateSagHarbor} 
          />
        </TabsContent>
        
        <TabsContent value="nearby-favorites" className="space-y-4">
          <NearbyFavoritesForm 
            data={localAreaData.nearbyFavorites} 
            onUpdate={updateNearbyFavorites} 
          />
        </TabsContent>
        
        <TabsContent value="summer-events" className="space-y-4">
          <SummerEventsForm 
            data={localAreaData.summerEvents} 
            onUpdate={updateSummerEvents} 
          />
        </TabsContent>
        
        <TabsContent value="insider-tips" className="space-y-4">
          <InsiderTipsForm 
            data={localAreaData.insiderTips} 
            onUpdate={updateInsiderTips} 
          />
        </TabsContent>
      </LocalAreaTabs>
    </div>
  );
};

export default AdminLocalArea;
