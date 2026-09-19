import React from 'react';
import { SiteContent } from '@/types/site-content';

interface Props {
  content: SiteContent;
}

const BookingBanner: React.FC<Props> = ({ content }) => (
  <section className="mx-[clamp(20px,4vw,48px)] flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-hh-ink p-[clamp(32px,4vw,48px)] text-hh-bg">
    <div>
      <h2 className="text-[clamp(24px,3vw,30px)] font-extrabold tracking-[-0.03em]">
        {content.bannerTitle}
      </h2>
      <p className="text-[15px] text-hh-muted-dark">{content.bannerSubtitle}</p>
      <p className="mt-[14px] flex flex-wrap gap-x-4 gap-y-1.5 text-[15px]">
        <span className="text-hh-muted-dark">Questions? Text or email Eddie:</span>
        <a href={`sms:${content.phone}`} className="font-bold text-hh-gold">
          {content.phoneDisplay}
        </a>
        <a href={`mailto:${content.email}`} className="font-bold text-hh-gold">
          {content.email}
        </a>
      </p>
    </div>

    <div className="flex flex-wrap gap-3">
      <a
        href={content.airbnbUrl}
        target="_blank"
        rel="noreferrer"
        className="rounded-full bg-hh-gold px-7 py-4 text-[15px] font-bold text-hh-ink"
      >
        Check availability →
      </a>
      <a
        href={content.marquisUrl}
        target="_blank"
        rel="noreferrer"
        className="rounded-full border-2 border-hh-bg px-7 py-[14px] text-[15px] font-bold text-hh-bg"
      >
        Book on StayMarquis
      </a>
    </div>
  </section>
);

export default BookingBanner;
