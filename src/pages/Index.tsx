
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import QuickDetails from '../components/QuickDetails';
import Experience from '../components/Experience';
import Gallery from '../components/Gallery';
import WhatYouGet from '../components/WhatYouGet';
import Features from '../components/Features';
import PerfectFor from '../components/PerfectFor';
import Location from '../components/Location';
import SocialProof from '../components/SocialProof';
import AvailabilityUrgency from '../components/AvailabilityUrgency';
import CTA from '../components/CTA';
import FinalCTA from '../components/FinalCTA';
import OtherPropertiesBanner from '../components/OtherPropertiesBanner';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
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
      <AvailabilityUrgency />
      <CTA />
      <OtherPropertiesBanner />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
