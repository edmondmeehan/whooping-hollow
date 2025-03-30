
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/local-area/HeroSection';
import EastHamptonSection from '../components/local-area/EastHamptonSection';
import SagHarborSection from '../components/local-area/SagHarborSection';
import NearbyFavorites from '../components/local-area/NearbyFavorites';
import SummerEventsSection from '../components/local-area/SummerEventsSection';
import InsiderTips from '../components/local-area/InsiderTips';

const LocalArea = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-16 flex-grow">
        <div className="container-custom">
          {/* Hero Section */}
          <HeroSection />
          
          {/* East Hampton Section */}
          <EastHamptonSection />
          
          {/* Sag Harbor Section */}
          <SagHarborSection />
          
          {/* Nearby Favorites */}
          <NearbyFavorites />
          
          {/* Summer Events */}
          <SummerEventsSection />
          
          {/* Insider Tips */}
          <InsiderTips />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LocalArea;
