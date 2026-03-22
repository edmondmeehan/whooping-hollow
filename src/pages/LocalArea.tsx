
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OtherPropertiesBanner from '../components/OtherPropertiesBanner';
import HeroSection from '../components/local-area/HeroSection';
import EastHamptonSection from '../components/local-area/EastHamptonSection';
import SagHarborSection from '../components/local-area/SagHarborSection';
import NearbyFavorites from '../components/local-area/NearbyFavorites';
import SummerEventsSection from '../components/local-area/SummerEventsSection';
import InsiderTips from '../components/local-area/InsiderTips';
import { useLocalArea } from '@/hooks/use-local-area';

const LocalArea = () => {
  const { localAreaData } = useLocalArea();
  
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <StickyHeader />
      <Navbar />
      
      <div className="pt-32 pb-16 flex-grow">
        <div className="container-custom">
          {/* Hero Section */}
          <HeroSection />
          
          {/* East Hampton Section */}
          <EastHamptonSection 
            title={localAreaData.eastHampton.title}
            description={localAreaData.eastHampton.description}
            highlights={localAreaData.eastHampton.highlights}
            imageUrl={localAreaData.eastHampton.imageUrl}
          />
          
          {/* Sag Harbor Section */}
          <SagHarborSection 
            title={localAreaData.sagHarbor.title}
            description={localAreaData.sagHarbor.description}
            highlights={localAreaData.sagHarbor.highlights}
            imageUrl={localAreaData.sagHarbor.imageUrl}
          />
          
          {/* Nearby Favorites */}
          <NearbyFavorites 
            title={localAreaData.nearbyFavorites.title}
            items={localAreaData.nearbyFavorites.items}
          />
          
          {/* Summer Events */}
          <SummerEventsSection 
            title={localAreaData.summerEvents.title}
            description={localAreaData.summerEvents.description}
            events={localAreaData.summerEvents.events}
          />
          
          {/* Insider Tips */}
          <InsiderTips 
            title={localAreaData.insiderTips.title}
            tips={localAreaData.insiderTips.tips}
          />
        </div>
      </div>
      
      <OtherPropertiesBanner />
      <Footer />
    </div>
  );
};

export default LocalArea;
