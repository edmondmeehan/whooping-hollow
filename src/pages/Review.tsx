import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface StayInfo {
  guest_name: string;
  check_out: string;
  already_reviewed: boolean;
}

const Review = () => {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);
  const [stay, setStay] = useState<StayInfo | null>(null);
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase.rpc('get_stay_for_review', { _token: token });
      if (!error && data && data.length > 0) {
        setStay(data[0] as StayInfo);
      }
      setLoading(false);
    };
    load();
  }, [token]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (body.trim().length < 10) {
      toast.error('Please write a little more about your stay.');
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.rpc('submit_guest_review', {
      _token: token,
      _rating: rating,
      _title: title.trim(),
      _body: body.trim(),
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message || 'Something went wrong. Please try again.');
      return;
    }
    // Fire-and-forget: email the submission to the owner.
    supabase.functions.invoke('notify-review', {
      body: {
        guestName: stay?.guest_name || 'A guest',
        rating,
        title: title.trim() || null,
        body: body.trim(),
        checkOut: stay?.check_out || null,
      },
    }).catch(() => {
      // The review is saved either way; don't block the thank-you screen.
    });
    setDone(true);
  };

  const firstName = stay?.guest_name?.trim().split(/\s+/)[0] ?? '';

  return (
    <div className="hh min-h-screen bg-hh-bg text-hh-ink">
      <header className="border-b border-hh-line">
        <div className="hh-gutter flex h-20 items-center justify-between">
          <Link to="/" className="text-sm font-bold uppercase tracking-[0.2em]">
            Whooping Hollow
          </Link>
          <span className="text-xs uppercase tracking-[0.18em] text-hh-muted">Guest review</span>
        </div>
      </header>

      <main className="hh-gutter py-16">
        <div className="mx-auto max-w-xl">
          {loading && <p className="text-hh-muted">Loading…</p>}

          {!loading && !stay && (
            <div>
              <h1 className="font-display text-3xl font-bold">This review link isn't valid</h1>
              <p className="mt-4 text-hh-muted">
                It may have been mistyped. Email{' '}
                <a className="underline" href="mailto:eddie@please.co">eddie@please.co</a> and we'll send a new one.
              </p>
            </div>
          )}

          {!loading && stay && (done || stay.already_reviewed) && (
            <div>
              <h1 className="font-display text-3xl font-bold">Thank you{firstName ? `, ${firstName}` : ''}.</h1>
              <p className="mt-4 text-hh-muted">
                Your review is in. We read every one, and we may share yours on the site.
              </p>
              <Link to="/" className="mt-8 inline-block underline">Back to the house</Link>
            </div>
          )}

          {!loading && stay && !done && !stay.already_reviewed && (
            <form onSubmit={submit} className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-hh-muted">
                  Stay ending {new Date(`${stay.check_out}T00:00:00`).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <h1 className="mt-3 font-display text-4xl font-bold leading-tight">
                  How was the house{firstName ? `, ${firstName}` : ''}?
                </h1>
                <p className="mt-4 text-hh-muted">
                  A minute of your time helps the next guests — and helps us make the place better.
                </p>
              </div>

              <div>
                <span className="mb-2 block text-sm font-semibold">Your rating</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      aria-label={`${value} star${value === 1 ? '' : 's'}`}
                      onClick={() => setRating(value)}
                      onMouseEnter={() => setHovered(value)}
                      onMouseLeave={() => setHovered(0)}
                      className="p-1"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          value <= (hovered || rating)
                            ? 'fill-hh-gold text-hh-gold'
                            : 'text-hh-line'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-semibold">
                  Headline <span className="font-normal text-hh-muted">(optional)</span>
                </label>
                <Input
                  id="title"
                  value={title}
                  maxLength={120}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="A quiet week by the pool"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="body" className="text-sm font-semibold">Your review</label>
                <Textarea
                  id="body"
                  value={body}
                  rows={8}
                  maxLength={4000}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="What stood out? What would you tell a friend?"
                  required
                />
              </div>

              <Button type="submit" disabled={submitting} className="bg-hh-ink text-hh-bg hover:bg-hh-ink/90">
                {submitting ? 'Sending…' : 'Submit review'}
              </Button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default Review;
