import React from 'react';

interface Props {
  highlights: string[];
}

const HighlightsStrip: React.FC<Props> = ({ highlights }) => (
  <section className="hh-gutter flex flex-wrap gap-x-10 gap-y-3 bg-hh-strip py-7 text-[15px] font-bold text-hh-ink">
    {highlights.map((item) => (
      <span key={item}>{item}</span>
    ))}
  </section>
);

export default HighlightsStrip;
