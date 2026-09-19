import React from 'react';
import { SiteContent } from '@/types/site-content';

interface Props {
  content: SiteContent;
}

const WhereSection: React.FC<Props> = ({ content }) => (
  <section
    id="where"
    className="hh-gutter grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-10 pb-[clamp(56px,7vw,96px)]"
  >
    <div>
      <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-hh-gold-text">Where</span>
      <h2 className="mt-3 text-[clamp(28px,3vw,36px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-hh-ink">
        {content.whereHeading}
      </h2>
    </div>

    <div>
      {content.distances.map((row, index) => (
        <div
          key={row.id}
          className={`flex items-center justify-between gap-4 py-[14px] text-[15px] text-hh-body ${
            index === content.distances.length - 1 ? '' : 'border-b border-hh-line'
          }`}
        >
          <span>{row.label}</span>
          <strong className="font-bold text-hh-ink">{row.time}</strong>
        </div>
      ))}
    </div>

    <div className="col-span-full min-h-[280px] overflow-hidden rounded-[20px] border border-hh-line [aspect-ratio:16/7]">
      <iframe
        title="Map of the property"
        src={`https://www.google.com/maps?q=${encodeURIComponent(content.mapQuery)}&output=embed&z=11`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full min-h-[280px] w-full border-0"
      />
    </div>
  </section>
);

export default WhereSection;
