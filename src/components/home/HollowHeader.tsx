import React from 'react';
import { SiteContent } from '@/types/site-content';

interface Props {
  content: SiteContent;
}

const navItems = [
  { label: 'Photos', href: '#photos' },
  { label: 'The house', href: '#house' },
  { label: 'Where', href: '#where' },
];

const HollowHeader: React.FC<Props> = ({ content }) => (
  <header className="hh-gutter sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-hh-line bg-hh-bg py-5">
    <a href="#top" className="whitespace-nowrap text-[18px] font-extrabold tracking-[-0.02em] text-hh-ink">
      {content.brandName}
    </a>

    <nav className="hidden items-center gap-7 md:flex">
      {navItems.map((item) => (
        <a key={item.href} href={item.href} className="text-sm font-semibold text-hh-body">
          {item.label}
        </a>
      ))}
    </nav>

    <a
      href={content.airbnbUrl}
      target="_blank"
      rel="noreferrer"
      className="whitespace-nowrap rounded-full bg-hh-gold px-5 py-3 text-sm font-bold text-hh-ink"
    >
      Check availability →
    </a>
  </header>
);

export default HollowHeader;
