CREATE TABLE public.stays (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  guest_email text NOT NULL,
  check_in date NOT NULL,
  check_out date NOT NULL,
  review_token uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  review_email_sent_at timestamptz,
  review_email_error text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.stays TO authenticated;
GRANT ALL ON public.stays TO service_role;
ALTER TABLE public.stays ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage stays" ON public.stays FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_stays_updated_at BEFORE UPDATE ON public.stays
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.guest_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stay_id uuid REFERENCES public.stays(id) ON DELETE SET NULL,
  guest_name text NOT NULL,
  rating integer NOT NULL,
  title text,
  body text NOT NULL,
  is_approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.guest_reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.guest_reviews TO authenticated;
GRANT ALL ON public.guest_reviews TO service_role;
ALTER TABLE public.guest_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view approved reviews" ON public.guest_reviews FOR SELECT TO anon, authenticated
  USING (is_approved = true);
CREATE POLICY "Admins manage reviews" ON public.guest_reviews FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_guest_reviews_updated_at BEFORE UPDATE ON public.guest_reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.get_stay_for_review(_token uuid)
RETURNS TABLE (guest_name text, check_out date, already_reviewed boolean)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT s.guest_name,
         s.check_out,
         EXISTS (SELECT 1 FROM public.guest_reviews r WHERE r.stay_id = s.id)
  FROM public.stays s
  WHERE s.review_token = _token
$$;

CREATE OR REPLACE FUNCTION public.submit_guest_review(_token uuid, _rating integer, _title text, _body text)
RETURNS uuid
LANGUAGE plpgsql VOLATILE SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_stay public.stays%ROWTYPE;
  v_id uuid;
BEGIN
  SELECT * INTO v_stay FROM public.stays WHERE review_token = _token;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Invalid review link';
  END IF;
  IF EXISTS (SELECT 1 FROM public.guest_reviews WHERE stay_id = v_stay.id) THEN
    RAISE EXCEPTION 'A review has already been submitted for this stay';
  END IF;
  IF _rating < 1 OR _rating > 5 THEN
    RAISE EXCEPTION 'Rating must be between 1 and 5';
  END IF;
  IF _body IS NULL OR length(btrim(_body)) = 0 THEN
    RAISE EXCEPTION 'Review cannot be empty';
  END IF;

  INSERT INTO public.guest_reviews (stay_id, guest_name, rating, title, body)
  VALUES (v_stay.id, v_stay.guest_name, _rating, nullif(btrim(left(coalesce(_title,''), 120)), ''), left(btrim(_body), 4000))
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_stay_for_review(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_guest_review(uuid, integer, text, text) TO anon, authenticated;