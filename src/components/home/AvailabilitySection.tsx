import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Loader2 } from 'lucide-react';
import { useAvailability } from '@/hooks/use-availability';
import { SiteContent } from '@/types/site-content';

interface Props {
  content: SiteContent;
}

const AvailabilitySection: React.FC<Props> = ({ content }) => {
  const { isBooked, loading, lastSyncedAt } = useAvailability();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <section
      id="availability"
      className="mx-[clamp(20px,4vw,48px)] border-t border-hh-line py-[clamp(48px,7vw,88px)]"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-hh-gold-text">
            Availability
          </p>
          <h2 className="mt-2 max-w-xl text-[clamp(26px,3.4vw,36px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-hh-ink">
            Open dates, straight from the booking calendar.
          </h2>
        </div>
        <a
          href={content.airbnbUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-hh-ink px-6 py-3 text-[14px] font-bold text-hh-bg"
        >
          Request these dates →
        </a>
      </div>

      <div className="rounded-3xl border border-hh-line bg-hh-strip p-[clamp(16px,3vw,32px)]">
        <div className="mb-6 flex flex-wrap items-center gap-6 text-[13px] text-hh-body">
          <span className="flex items-center gap-2">
            <span className="h-3.5 w-3.5 rounded-sm border border-hh-line bg-hh-bg" />
            Available
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3.5 w-3.5 rounded-sm bg-hh-muted-dark" />
            Booked
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-hh-gold-text" />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="overflow-x-auto rounded-2xl bg-hh-bg p-4 sm:p-6">
              <Calendar
                mode="default"
                numberOfMonths={2}
                fromMonth={today}
                disabled={[{ before: today }, (date: Date) => isBooked(date)]}
                modifiers={{ booked: (date: Date) => isBooked(date) }}
                modifiersClassNames={{
                  booked: 'bg-hh-muted-dark/60 text-hh-bg line-through rounded-md',
                }}
                className="border-0 p-0"
              />
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-[13px] text-hh-muted">
          Updated automatically from Airbnb
          {lastSyncedAt ? ` · last checked ${lastSyncedAt.toLocaleString()}` : ''}
        </p>
      </div>
    </section>
  );
};

export default AvailabilitySection;
