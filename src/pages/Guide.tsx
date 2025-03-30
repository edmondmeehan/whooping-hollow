
import React from 'react';
import Navbar from '../components/Navbar';
import GuideBanner from '../components/GuideBanner';
import GuideTabs from '../components/GuideTabs';
import Footer from '../components/Footer';

const Guide = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <GuideBanner />
      <div className="container-custom py-12">
        <GuideTabs />
      </div>
      <Footer />
    </div>
  );
};

export default Guide;
