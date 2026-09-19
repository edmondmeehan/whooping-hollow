CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TABLE public.calendar_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  ical_url text,
  is_active boolean NOT NULL DEFAULT true,
  last_synced_at timestamptz,
  last_error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.calendar_sources TO authenticated;
GRANT ALL ON public.calendar_sources TO service_role;

ALTER TABLE public.calendar_sources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage calendar sources"
  ON public.calendar_sources FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TABLE public.blocked_dates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id uuid REFERENCES public.calendar_sources(id) ON DELETE CASCADE,
  source_name text NOT NULL DEFAULT 'manual',
  uid text,
  summary text,
  start_date date NOT NULL,
  end_date date NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX blocked_dates_range_idx ON public.blocked_dates (start_date, end_date);

GRANT SELECT ON public.blocked_dates TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blocked_dates TO authenticated;
GRANT ALL ON public.blocked_dates TO service_role;

ALTER TABLE public.blocked_dates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view blocked dates"
  ON public.blocked_dates FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins manage blocked dates"
  ON public.blocked_dates FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_calendar_sources_updated_at
  BEFORE UPDATE ON public.calendar_sources
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blocked_dates_updated_at
  BEFORE UPDATE ON public.blocked_dates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.calendar_sources (name, ical_url, is_active) VALUES ('Airbnb', NULL, true);