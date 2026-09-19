
import React, { useEffect } from 'react';
import LongformGuide from '@/components/guide/LongformGuide';
import { initialGuideSections } from '@/data/initialGuideSections';
import { useSiteContent } from '@/hooks/use-site-content';

const Guide = () => {
  const { content } = useSiteContent();

  useEffect(() => {
    const STORAGE_KEY_SECTIONS = 'guideContentSections';
    const storedSections = localStorage.getItem(STORAGE_KEY_SECTIONS);
    
    if (!storedSections) {
      localStorage.setItem(STORAGE_KEY_SECTIONS, JSON.stringify(initialGuideSections));
    }
    
  }, []);

  return (
    <div className="hh min-h-screen bg-hh-bg">
      <header className="hh-gutter flex items-center justify-between gap-5 border-b border-hh-line bg-hh-bg py-5">
        <a href="/" className="whitespace-nowrap text-lg font-extrabold text-hh-ink">{content.brandName}</a>
        <a href={`sms:${content.phone}`} className="text-sm font-bold text-hh-gold-text">Text your host</a>
      </header>

      <section className="hh-gutter border-b border-hh-line bg-hh-bg py-14 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_0.6fr] md:items-end">
          <div>
            <p className="text-xs font-bold uppercase text-hh-gold-text">Your stay at {content.brandName}</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-extrabold leading-[1.02] text-hh-ink md:text-7xl">The guest guide.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-hh-body md:text-xl">
              Everything you need before arrival, throughout your stay, and when it’s time to head home.
            </p>
          </div>
          <div className="border-l-2 border-hh-gold pl-5 text-sm leading-6 text-hh-muted">
            <p className="font-bold text-hh-ink">Save this page for your stay.</p>
            <p>It is available anytime and works well on your phone.</p>
          </div>
        </div>
      </section>

      <LongformGuide />

      <section className="hh-gutter bg-hh-ink py-16 text-hh-bg md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase text-hh-muted-dark">Need a hand?</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-extrabold md:text-5xl">We’re here throughout your stay.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`sms:${content.phone}`} className="rounded-full bg-hh-gold px-5 py-3 text-sm font-bold text-hh-ink">Text {content.phoneDisplay}</a>
            <a href={`mailto:${content.email}`} className="rounded-full border border-hh-muted px-5 py-3 text-sm font-bold text-hh-bg">Email us</a>
          </div>
        </div>
      </section>

      <footer className="hh-gutter flex flex-wrap justify-between gap-3 py-8 text-xs text-hh-muted">
        <span>{content.address}</span>
        <a href="/" className="font-bold text-hh-ink">Back to Whooping Hollow</a>
      </footer>
    </div>
  );
};

export default Guide;
