
import React from 'react';
import { MapPin, Utensils, Car } from 'lucide-react';
import GuideSection from '../GuideSection';
import { useLocalArea } from '@/hooks/use-local-area';
import EastHamptonSection from '../local-area/EastHamptonSection';
import SagHarborSection from '../local-area/SagHarborSection';
import NearbyFavorites from '../local-area/NearbyFavorites';
import SummerEventsSection from '../local-area/SummerEventsSection';
import InsiderTips from '../local-area/InsiderTips';

const LocalAreaTab = () => {
  const { localAreaData } = useLocalArea();
  
  return (
    <>
      <div className="mb-12">
        <EastHamptonSection 
          title={localAreaData.eastHampton.title}
          description={localAreaData.eastHampton.description}
          highlights={localAreaData.eastHampton.highlights}
          imageUrl={localAreaData.eastHampton.imageUrl}
        />
      </div>
      
      <div className="mb-12">
        <SagHarborSection 
          title={localAreaData.sagHarbor.title}
          description={localAreaData.sagHarbor.description}
          highlights={localAreaData.sagHarbor.highlights}
          imageUrl={localAreaData.sagHarbor.imageUrl}
        />
      </div>
      
      <div className="mb-12">
        <NearbyFavorites 
          title={localAreaData.nearbyFavorites.title}
          items={localAreaData.nearbyFavorites.items}
        />
      </div>
      
      <div className="mb-12">
        <SummerEventsSection 
          title={localAreaData.summerEvents.title}
          description={localAreaData.summerEvents.description}
          events={localAreaData.summerEvents.events}
        />
      </div>
      
      <div className="mb-12">
        <InsiderTips 
          title={localAreaData.insiderTips.title}
          tips={localAreaData.insiderTips.tips}
        />
      </div>
      
      <GuideSection title="Transportation & Parking" icon={<Car />}>
        <div className="space-y-4">
          <p>
            Our driveway can accommodate up to 3 vehicles. Street parking is also available without restrictions.
          </p>
          
          <div>
            <h3 className="font-medium mb-2">Local Transportation Options:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-medium">Uber/Lyft:</span> Available in the area, but can be limited especially during peak season.
              </li>
              <li>
                <span className="font-medium">Hampton Jitney:</span> Bus service to/from NYC with a stop in East Hampton town. Schedule available at hamptonjitney.com.
              </li>
              <li>
                <span className="font-medium">Local Taxi:</span> East Hampton Town Taxi - (631) 324-TAXI.
              </li>
              <li>
                <span className="font-medium">Bicycle Rentals:</span> East Hampton Bicycles - (631) 324-5977.
              </li>
            </ul>
          </div>
        </div>
      </GuideSection>
    </>
  );
};

export default LocalAreaTab;
