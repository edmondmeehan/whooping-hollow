import React, { ReactNode } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Coffee,
  Home,
  Info,
  MapPin,
  Recycle,
  Utensils,
  Wifi,
  Zap,
} from 'lucide-react';
import { useLocalStorageSections } from '@/hooks/use-local-storage-sections';
import { GuideSection } from '@/types/guide';

type GuideGroup = {
  key: 'welcome' | 'house' | 'local' | 'checkout' | 'emergency';
  number: string;
  label: string;
  eyebrow: string;
  description: string;
  sections: GuideSection[];
};

const iconForSection = (group: GuideGroup['key'], title: string): ReactNode => {
  const normalized = title.toLowerCase();

  if (normalized.includes('wifi') || normalized.includes('network')) return <Wifi />;
  if (normalized.includes('rule')) return <Info />;
  if (normalized.includes('check-in')) return <Clock3 />;
  if (normalized.includes('appliance') || normalized.includes('thermostat')) return <Zap />;
  if (normalized.includes('trash') || normalized.includes('recycl')) return <Recycle />;
  if (normalized.includes('restaurant') || normalized.includes('food')) return <Utensils />;
  if (normalized.includes('direction') || normalized.includes('location')) return <MapPin />;
  if (normalized.includes('check-out') || normalized.includes('checkout')) return <ClipboardCheck />;
  if (group === 'emergency') return <AlertTriangle />;
  if (group === 'checkout') return <CheckCircle2 />;
  if (group === 'local') return <MapPin />;
  if (group === 'house') return <Coffee />;
  return <Home />;
};

const parseWifi = (content: string) => {
  const network = content.match(/network(?:\s+name)?(?:\s*:\s*|\s+)([^\n\r]+)/i)?.[1]?.trim();
  const password = content.match(/password(?:\s*:\s*|\s+)([^\n\r]+)/i)?.[1]?.trim();
  return { network, password };
};

const GuideEntry = ({ section, group }: { section: GuideSection; group: GuideGroup['key'] }) => {
  const isWifi = /wifi|network/i.test(section.title);
  const wifi = isWifi ? parseWifi(section.content) : null;

  return (
    <article className="guide-entry grid gap-5 border-t border-hh-line py-8 md:grid-cols-[52px_minmax(0,1fr)] md:py-10">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-hh-strip text-hh-gold-text [&>svg]:h-5 [&>svg]:w-5">
        {iconForSection(group, section.title)}
      </div>
      <div className="min-w-0">
        <h3 className="text-xl font-extrabold text-hh-ink md:text-2xl">{section.title}</h3>
        <p className="mt-4 whitespace-pre-line text-[15px] leading-7 text-hh-body md:text-base">
          {section.content}
        </p>

        {wifi && (wifi.network || wifi.password) && (
          <dl className="mt-6 grid gap-px overflow-hidden border border-hh-line bg-hh-line sm:grid-cols-2">
            {wifi.network && (
              <div className="bg-hh-bg p-4">
                <dt className="text-[11px] font-bold uppercase text-hh-muted">Network</dt>
                <dd className="mt-2 break-all font-mono text-sm font-semibold text-hh-ink">{wifi.network}</dd>
              </div>
            )}
            {wifi.password && (
              <div className="bg-hh-bg p-4">
                <dt className="text-[11px] font-bold uppercase text-hh-muted">Password</dt>
                <dd className="mt-2 break-all font-mono text-sm font-semibold text-hh-ink">{wifi.password}</dd>
              </div>
            )}
          </dl>
        )}
      </div>
    </article>
  );
};

const LongformGuide = () => {
  const welcome = useLocalStorageSections('welcome');
  const house = useLocalStorageSections('house');
  const local = useLocalStorageSections('local');
  const checkout = useLocalStorageSections('checkout');
  const emergency = useLocalStorageSections('emergency');

  const groups: GuideGroup[] = [
    { key: 'welcome', number: '01', label: 'Welcome', eyebrow: 'Start here', description: 'A warm welcome, the essentials, and a few house rules.', sections: welcome },
    { key: 'house', number: '02', label: 'House info', eyebrow: 'During your stay', description: 'Everything you need to settle in and feel at home.', sections: house },
    { key: 'local', number: '03', label: 'Local area', eyebrow: 'Explore nearby', description: 'Our practical notes and favorite places around East Hampton.', sections: local },
    { key: 'checkout', number: '04', label: 'Check-out', eyebrow: 'Before you leave', description: 'A short checklist for a simple departure.', sections: checkout },
    { key: 'emergency', number: '05', label: 'Emergency', eyebrow: 'Keep handy', description: 'Important contacts and help if you need it.', sections: emergency },
  ];

  return (
    <div className="guide-longform">
      <nav aria-label="Guide sections" className="guide-nav sticky top-[65px] z-40 border-y border-hh-line bg-hh-bg/95 backdrop-blur-sm">
        <div className="hh-gutter mx-auto flex max-w-7xl gap-6 overflow-x-auto py-4">
          {groups.map((group) => (
            <a key={group.key} href={`#${group.key}`} className="shrink-0 text-xs font-bold uppercase text-hh-body">
              {group.number} <span className="ml-1 text-hh-ink">{group.label}</span>
            </a>
          ))}
        </div>
      </nav>

      <main>
        {groups.map((group, index) => (
          <section
            id={group.key}
            key={group.key}
            className={`guide-group scroll-mt-32 ${index % 2 === 1 ? 'bg-hh-strip' : 'bg-hh-bg'}`}
          >
            <div className="hh-gutter mx-auto grid max-w-7xl gap-8 py-16 md:grid-cols-[minmax(220px,0.7fr)_minmax(0,1.5fr)] md:gap-16 md:py-24">
              <header className="md:sticky md:top-36 md:self-start">
                <p className="text-xs font-bold uppercase text-hh-gold-text">{group.number} · {group.eyebrow}</p>
                <h2 className="mt-3 text-3xl font-extrabold text-hh-ink md:text-5xl">{group.label}</h2>
                <p className="mt-4 max-w-sm text-sm leading-6 text-hh-muted md:text-base">{group.description}</p>
              </header>

              <div>
                {group.sections.map((section) => (
                  <GuideEntry key={section.id} section={section} group={group.key} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default LongformGuide;