import React from 'react';
import { StatItem } from '@/types/site-content';

interface Props {
  stats: StatItem[];
}

const StatsSection: React.FC<Props> = ({ stats }) => (
  <section
    id="house"
    className="hh-gutter grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-10 py-[clamp(56px,7vw,96px)]"
  >
    {stats.map((stat) => (
      <div key={stat.id}>
        <div className="text-[44px] font-extrabold leading-none tracking-[-0.03em] text-hh-ink">
          {stat.value}{' '}
          <span className="text-[18px] font-medium tracking-normal text-hh-body">{stat.unit}</span>
        </div>
        <p className="mt-2 text-[15px] leading-[1.5] text-hh-body">{stat.caption}</p>
      </div>
    ))}
  </section>
);

export default StatsSection;
