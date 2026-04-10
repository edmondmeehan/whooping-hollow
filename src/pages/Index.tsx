
import React from 'react';
import Navbar from '../components/Navbar';
import StickyHeader from '../components/StickyHeader';
import Hero from '../components/Hero';
import QuickDetails from '../components/QuickDetails';
import Experience from '../components/Experience';
import Gallery from '../components/Gallery';
import WhatYouGet from '../components/WhatYouGet';
import Features from '../components/Features';
import PerfectFor from '../components/PerfectFor';
import Location from '../components/Location';
import SocialProof from '../components/SocialProof';
import PricingClarity from '../components/PricingClarity';
import AvailabilityUrgency from '../components/AvailabilityUrgency';
import CTA from '../components/CTA';
import TextCTA from '../components/TextCTA';
import TrustSection from '../components/TrustSection';
import OtherPropertiesBanner from '../components/OtherPropertiesBanner';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import WeatherWidget from '../components/WeatherWidget';

const Index = () => {
  return (
    <div className="min-h-screen">
      <StickyHeader />
      <Navbar />
      <Hero />
      <QuickDetails />
      <Experience />
      <Gallery />
      <WhatYouGet />
      <Features />
      <PerfectFor />
      <Location />
      <SocialProof />
      <PricingClarity />
      <AvailabilityUrgency />
      <CTA />
      <TextCTA />
      <TrustSection />
      <OtherPropertiesBanner />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
