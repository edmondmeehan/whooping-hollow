import React from 'react';
import { SiteContent } from '@/types/site-content';

interface Props {
  content: SiteContent;
}

const NashvilleSection: React.FC<Props> = ({ content }) => (
  <section
    id="nashville"
    className="hh-gutter border-t border-hh-line pb-[clamp(56px,7vw,96px)] pt-[clamp(40px,5vw,64px)]"
  >
    <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
      <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-hh-gold-text">
        Also from us · Nashville
      </span>
      <span className="text-sm text-hh-muted">{content.nashvilleNote}</span>
    </div>

    <div className="flex flex-wrap gap-4">
      {content.nashville.map((listing) => (
        <a
          key={listing.id}
          href={listing.url}
          target="_blank"
          rel="noreferrer"
          className="grid flex-1 basis-[300px] grid-cols-[120px_1fr] gap-4 rounded-2xl border border-hh-line bg-white p-3"
        >
          <img
            src={listing.imageUrl}
            alt={listing.title}
            loading="lazy"
            className="h-24 w-[120px] rounded-[10px] object-cover"
          />
          <div>
            <h3 className="text-[17px] font-extrabold tracking-[-0.02em] text-hh-ink">{listing.title}</h3>
            <p className="mt-1 text-sm text-hh-body">{listing.meta}</p>
            <p className="mt-2 text-[13px] font-bold text-hh-gold-text">
              ★ {listing.rating} · View on Airbnb →
            </p>
          </div>
        </a>
      ))}
    </div>
  </section>
);

export default NashvilleSection;
