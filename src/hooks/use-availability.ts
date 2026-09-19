import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface BlockedRange {
  start: Date;
  end: Date;
  sourceName: string;
}

const STALE_MS = 60 * 60 * 1000; // 1 hour

const parseDate = (value: string) => {
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const useAvailability = () => {
  const [ranges, setRanges] = useState<BlockedRange[]>([]);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const [{ data: blocked }, { data: sources }] = await Promise.all([
      supabase.from('blocked_dates').select('start_date, end_date, source_name'),
      supabase.from('calendar_sources').select('last_synced_at'),
    ]);

    setRanges(
      (blocked ?? []).map((row) => ({
        start: parseDate(row.start_date),
        end: parseDate(row.end_date),
        sourceName: row.source_name,
      }))
    );

    const times = (sources ?? [])
      .map((s) => s.last_synced_at)
      .filter(Boolean)
      .map((t) => new Date(t as string).getTime());
    setLastSyncedAt(times.length ? new Date(Math.max(...times)) : null);

    return times.length ? Math.max(...times) : 0;
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const latest = await load();
        if (cancelled) return;

        if (Date.now() - latest > STALE_MS) {
          await supabase.functions.invoke('sync-airbnb-calendar');
          if (!cancelled) await load();
        }
      } catch (error) {
        console.error('Failed to load availability:', error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [load]);

  const isBooked = useCallback(
    (date: Date) => {
      const time = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
      // Checkout day is available again, so the end date is exclusive.
      return ranges.some((r) => time >= r.start.getTime() && time < r.end.getTime());
    },
    [ranges]
  );

  return { ranges, isBooked, loading, lastSyncedAt, refresh: load };
};
