import React from 'react';
import { useSiteContent } from '@/hooks/use-site-content';
import HollowHeader from '@/components/home/HollowHeader';
import HollowHero from '@/components/home/HollowHero';
import HighlightsStrip from '@/components/home/HighlightsStrip';
import PhotoGrid from '@/components/home/PhotoGrid';
import StatsSection from '@/components/home/StatsSection';
import AmenitiesList from '@/components/home/AmenitiesList';
import WhereSection from '@/components/home/WhereSection';
import NashvilleSection from '@/components/home/NashvilleSection';
import AvailabilitySection from '@/components/home/AvailabilitySection';
import BookingBanner from '@/components/home/BookingBanner';
import HollowFooter from '@/components/home/HollowFooter';

const Index = () => {
  const { content } = useSiteContent();

  return (
    <div className="hh min-h-screen">
      <HollowHeader content={content} />
      <HollowHero content={content} />
      <HighlightsStrip highlights={content.highlights} />
      <PhotoGrid />
      <StatsSection stats={content.stats} />
      <AmenitiesList amenities={content.amenities} />
      <WhereSection content={content} />
      <NashvilleSection content={content} />
      <AvailabilitySection content={content} />
      <BookingBanner content={content} />
      <HollowFooter content={content} />
    </div>
  );
};

export default Index;
