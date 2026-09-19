import React from 'react';
import { SiteContent } from '@/types/site-content';

interface Props {
  content: SiteContent;
}

const HollowFooter: React.FC<Props> = ({ content }) => (
  <footer className="hh-gutter flex flex-wrap justify-between gap-3 py-10 text-[13px] text-hh-muted">
    <span>{content.address}</span>
    <span className="flex gap-1.5">
      <a href={`sms:${content.phone}`}>{content.phoneDisplay}</a>
      <span>·</span>
      <a href={`mailto:${content.email}`}>{content.email}</a>
    </span>
    <span>{content.footerNote}</span>
  </footer>
);

export default HollowFooter;
