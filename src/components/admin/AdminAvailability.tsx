import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface CalendarSource {
  id: string;
  name: string;
  ical_url: string | null;
  is_active: boolean;
  last_synced_at: string | null;
  last_error: string | null;
}

const AdminAvailability = () => {
  const [sources, setSources] = useState<CalendarSource[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [blockedCount, setBlockedCount] = useState(0);

  const load = async () => {
    const { data, error } = await supabase
      .from('calendar_sources')
      .select('*')
      .order('name');
    if (error) {
      toast.error('Could not load calendar feeds');
      setLoading(false);
      return;
    }
    const rows = (data ?? []) as CalendarSource[];
    setSources(rows);
    setUrls(Object.fromEntries(rows.map((r) => [r.id, r.ical_url ?? ''])));

    const { count } = await supabase
      .from('blocked_dates')
      .select('id', { count: 'exact', head: true });
    setBlockedCount(count ?? 0);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const saveUrl = async (source: CalendarSource) => {
    const value = (urls[source.id] ?? '').trim();
    const { error } = await supabase
      .from('calendar_sources')
      .update({ ical_url: value || null })
      .eq('id', source.id);
    if (error) {
      toast.error('Could not save the calendar link');
      return;
    }
    toast.success(`${source.name} calendar link saved`);
    load();
  };

  const syncNow = async () => {
    setSyncing(true);
    const { error } = await supabase.functions.invoke('sync-airbnb-calendar');
    setSyncing(false);
    if (error) {
      toast.error('Sync failed. Check the calendar link and try again.');
      return;
    }
    toast.success('Calendar synced');
    load();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Booking calendars</CardTitle>
          <CardDescription>
            Paste the calendar export link from Airbnb (Listing → Availability → Connect calendars →
            Export calendar). The home page calendar updates from it automatically, about once an hour.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {sources.map((source) => (
            <div key={source.id} className="space-y-2">
              <Label htmlFor={`url-${source.id}`}>{source.name} calendar link</Label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  id={`url-${source.id}`}
                  value={urls[source.id] ?? ''}
                  placeholder="https://www.airbnb.com/calendar/ical/....ics"
                  onChange={(e) => setUrls((prev) => ({ ...prev, [source.id]: e.target.value }))}
                />
                <Button onClick={() => saveUrl(source)}>Save</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {source.last_synced_at
                  ? `Last checked ${new Date(source.last_synced_at).toLocaleString()}`
                  : 'Not checked yet'}
              </p>
              {source.last_error && (
                <p className="text-xs text-destructive">Last sync problem: {source.last_error}</p>
              )}
            </div>
          ))}

          <div className="flex flex-wrap items-center gap-4 border-t pt-4">
            <Button variant="outline" onClick={syncNow} disabled={syncing}>
              {syncing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Sync now
            </Button>
            <span className="text-sm text-muted-foreground">
              {blockedCount} booked date range{blockedCount === 1 ? '' : 's'} showing on the site
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAvailability;
