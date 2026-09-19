import React from 'react';
import { SiteContent } from '@/types/site-content';
import { useCurrentWeather } from '@/hooks/use-current-weather';

interface Props {
  content: SiteContent;
}

const HollowHero: React.FC<Props> = ({ content }) => {
  const weather = useCurrentWeather();

  return (
    <section
      id="top"
      className="grid min-h-[640px] grid-cols-[repeat(auto-fit,minmax(340px,1fr))]"
    >
      <div className="hh-gutter flex flex-col justify-center gap-6 py-[clamp(40px,6vw,80px)]">
        <div className="flex flex-wrap items-center gap-[14px]">
          <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-hh-gold-text">
            {content.eyebrow}
          </span>

          {weather && (
            <span className="flex items-center gap-2 rounded-full border border-hh-line bg-white px-3 py-1.5 text-[13px] text-hh-body">
              <span className="h-[7px] w-[7px] rounded-full bg-hh-gold" />
              <span>
                Right now <strong className="font-bold text-hh-ink">{weather.temperature}°</strong> ·{' '}
                {weather.label}
              </span>
            </span>
          )}
        </div>

        <h1 className="text-[clamp(40px,5vw,64px)] font-extrabold leading-none tracking-[-0.035em] text-hh-ink">
          {content.headline}
        </h1>

        <p className="max-w-[46ch] text-[18px] leading-[1.55] text-hh-body">{content.intro}</p>

        <div className="mt-2 flex flex-wrap gap-3">
          <a
            href={content.airbnbUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-hh-ink px-[26px] py-4 text-[15px] font-bold text-hh-bg"
          >
            Book on Airbnb
          </a>
          <a
            href={content.marquisUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border-2 border-hh-ink px-[26px] py-[14px] text-[15px] font-bold text-hh-ink"
          >
            Book on StayMarquis
          </a>
        </div>
      </div>

      <div className="min-h-[420px]">
        <img
          src={content.heroImageUrl}
          alt="Heated pool at Whooping Hollow"
          className="h-full min-h-[420px] w-full object-cover"
        />
      </div>
    </section>
  );
};

export default HollowHero;
