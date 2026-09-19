import React from 'react';

interface Props {
  amenities: string[];
}

const AmenitiesList: React.FC<Props> = ({ amenities }) => (
  <section className="hh-gutter grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-12 pb-[clamp(56px,7vw,96px)]">
    {amenities.map((item) => (
      <div key={item} className="border-b border-hh-line py-[14px] text-[15px] font-medium text-hh-body">
        {item}
      </div>
    ))}
  </section>
);

export default AmenitiesList;
