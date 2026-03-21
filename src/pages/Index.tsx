
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Gallery from '../components/Gallery';
import CTA from '../components/CTA';
import OtherPropertiesBanner from '../components/OtherPropertiesBanner';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Gallery />
      <CTA />
      <OtherPropertiesBanner />
      <Footer />
    </div>
  );
};

export default Index;
