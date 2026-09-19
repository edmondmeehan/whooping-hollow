import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface Event {
  uid: string | null;
  summary: string | null;
  start: string;
  end: string;
}

function unfold(ics: string): string[] {
  const raw = ics.replace(/\r\n/g, "\n").split("\n");
  const lines: string[] = [];
  for (const line of raw) {
    if ((line.startsWith(" ") || line.startsWith("\t")) && lines.length > 0) {
      lines[lines.length - 1] += line.slice(1);
    } else {
      lines.push(line);
    }
  }
  return lines;
}

function toISODate(value: string): string | null {
  const v = value.trim();
  const m = v.match(/^(\d{4})(\d{2})(\d{2})/);
  if (!m) return null;
  return `${m[1]}-${m[2]}-${m[3]}`;
}

function parseIcs(ics: string): Event[] {
  const events: Event[] = [];
  let current: Partial<Event> | null = null;

  for (const line of unfold(ics)) {
    if (line.startsWith("BEGIN:VEVENT")) {
      current = { uid: null, summary: null };
      continue;
    }
    if (line.startsWith("END:VEVENT")) {
      if (current?.start && current?.end) {
        events.push(current as Event);
      }
      current = null;
      continue;
    }
    if (!current) continue;

    const sep = line.indexOf(":");
    if (sep === -1) continue;
    const name = line.slice(0, sep).split(";")[0].toUpperCase();
    const value = line.slice(sep + 1);

    if (name === "DTSTART") current.start = toISODate(value) ?? undefined;
    else if (name === "DTEND") current.end = toISODate(value) ?? undefined;
    else if (name === "UID") current.uid = value.trim();
    else if (name === "SUMMARY") current.summary = value.trim();
  }

  return events;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  try {
    const { data: sources, error: sourcesError } = await supabase
      .from("calendar_sources")
      .select("id, name, ical_url, is_active");

    if (sourcesError) throw sourcesError;

    const active = (sources ?? []).filter((s) => s.is_active && s.ical_url);
    const results: Record<string, unknown>[] = [];

    for (const source of active) {
      try {
        const response = await fetch(source.ical_url as string, {
          headers: { "User-Agent": "WhoopingHollowCalendarSync/1.0" },
        });

        if (!response.ok) {
          const body = await response.text();
          throw new Error(`[${response.status}] ${body.slice(0, 300)}`);
        }

        const ics = await response.text();
        const events = parseIcs(ics);

        const { error: deleteError } = await supabase
          .from("blocked_dates")
          .delete()
          .eq("source_id", source.id);
        if (deleteError) throw deleteError;

        if (events.length > 0) {
          const rows = events.map((e) => ({
            source_id: source.id,
            source_name: source.name,
            uid: e.uid,
            summary: e.summary,
            start_date: e.start,
            end_date: e.end,
          }));
          const { error: insertError } = await supabase.from("blocked_dates").insert(rows);
          if (insertError) throw insertError;
        }

        await supabase
          .from("calendar_sources")
          .update({ last_synced_at: new Date().toISOString(), last_error: null })
          .eq("id", source.id);

        results.push({ source: source.name, events: events.length });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`Sync failed for ${source.name}:`, message);
        await supabase
          .from("calendar_sources")
          .update({ last_synced_at: new Date().toISOString(), last_error: message })
          .eq("id", source.id);
        results.push({ source: source.name, error: message });
      }
    }

    return new Response(JSON.stringify({ synced: results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("sync-airbnb-calendar failed:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
