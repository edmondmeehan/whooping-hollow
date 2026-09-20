import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Loader2, Send, Star, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Stay {
  id: string;
  guest_name: string;
  guest_email: string;
  check_in: string;
  check_out: string;
  review_token: string;
  review_email_sent_at: string | null;
  review_email_error: string | null;
}

interface Review {
  id: string;
  guest_name: string;
  rating: number;
  title: string | null;
  body: string;
  is_approved: boolean;
  created_at: string;
}

const emptyForm = { guest_name: '', guest_email: '', check_in: '', check_out: '' };

const AdminReviews = () => {
  const [stays, setStays] = useState<Stay[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sendingId, setSendingId] = useState<string | null>(null);

  const load = async () => {
    const [{ data: stayRows }, { data: reviewRows }] = await Promise.all([
      supabase.from('stays').select('*').order('check_out', { ascending: false }),
      supabase.from('guest_reviews').select('*').order('created_at', { ascending: false }),
    ]);
    setStays((stayRows ?? []) as Stay[]);
    setReviews((reviewRows ?? []) as Review[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const addStay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.guest_name.trim() || !form.guest_email.trim() || !form.check_in || !form.check_out) {
      toast.error('Please fill in every field');
      return;
    }
    if (form.check_out < form.check_in) {
      toast.error('Check-out must be after check-in');
      return;
    }
    setSaving(true);
    const { error } = await supabase.from('stays').insert({
      guest_name: form.guest_name.trim().slice(0, 120),
      guest_email: form.guest_email.trim().toLowerCase().slice(0, 255),
      check_in: form.check_in,
      check_out: form.check_out,
    });
    setSaving(false);
    if (error) {
      toast.error('Could not save the stay');
      return;
    }
    toast.success('Stay added — the review email sends 3 days after check-out');
    setForm(emptyForm);
    load();
  };

  const sendNow = async (stay: Stay) => {
    setSendingId(stay.id);
    const { data, error } = await supabase.functions.invoke('send-review-requests', {
      body: { stayId: stay.id },
    });
    setSendingId(null);
    const failed = (data as any)?.results?.find((r: any) => r.sent === false);
    if (error || failed) {
      toast.error('Email could not be sent. Check the sending address is verified.');
    } else {
      toast.success(`Review request sent to ${stay.guest_name}`);
    }
    load();
  };

  const deleteStay = async (stay: Stay) => {
    await supabase.from('stays').delete().eq('id', stay.id);
    toast.success('Stay removed');
    load();
  };

  const copyLink = (stay: Stay) => {
    navigator.clipboard.writeText(`${window.location.origin}/review/${stay.review_token}`);
    toast.success('Review link copied');
  };

  const setApproved = async (review: Review, approved: boolean) => {
    await supabase.from('guest_reviews').update({ is_approved: approved }).eq('id', review.id);
    load();
  };

  const deleteReview = async (review: Review) => {
    await supabase.from('guest_reviews').delete().eq('id', review.id);
    toast.success('Review deleted');
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
          <CardTitle>Add a stay</CardTitle>
          <CardDescription>
            Record each guest after they book. Three days after check-out they automatically get an
            email asking for a review on your own site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={addStay} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="guest_name">Guest name</Label>
              <Input
                id="guest_name"
                value={form.guest_name}
                onChange={(e) => setForm({ ...form, guest_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guest_email">Guest email</Label>
              <Input
                id="guest_email"
                type="email"
                value={form.guest_email}
                onChange={(e) => setForm({ ...form, guest_email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="check_in">Check-in</Label>
              <Input
                id="check_in"
                type="date"
                value={form.check_in}
                onChange={(e) => setForm({ ...form, check_in: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="check_out">Check-out</Label>
              <Input
                id="check_out"
                type="date"
                value={form.check_out}
                onChange={(e) => setForm({ ...form, check_out: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving…' : 'Add stay'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stays &amp; review requests</CardTitle>
          <CardDescription>{stays.length} stay{stays.length === 1 ? '' : 's'} recorded</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {stays.length === 0 && (
            <p className="text-sm text-muted-foreground">No stays yet.</p>
          )}
          {stays.map((stay) => (
            <div key={stay.id} className="flex flex-col gap-3 border-b pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="font-medium">{stay.guest_name}</p>
                <p className="text-sm text-muted-foreground">{stay.guest_email}</p>
                <p className="text-xs text-muted-foreground">
                  {stay.check_in} → {stay.check_out} ·{' '}
                  {stay.review_email_sent_at
                    ? `review request sent ${new Date(stay.review_email_sent_at).toLocaleDateString()}`
                    : 'review request pending'}
                </p>
                {stay.review_email_error && (
                  <p className="text-xs text-destructive">Last attempt failed: {stay.review_email_error}</p>
                )}
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => copyLink(stay)}>
                  <Copy className="mr-2 h-3.5 w-3.5" /> Link
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={sendingId === stay.id}
                  onClick={() => sendNow(stay)}
                >
                  {sendingId === stay.id ? (
                    <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-3.5 w-3.5" />
                  )}
                  {stay.review_email_sent_at ? 'Send again' : 'Send now'}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deleteStay(stay)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Guest reviews</CardTitle>
          <CardDescription>Approve a review to allow it to be shown on your site.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {reviews.length === 0 && (
            <p className="text-sm text-muted-foreground">No reviews yet.</p>
          )}
          {reviews.map((review) => (
            <div key={review.id} className="space-y-2 border-b pb-4 last:border-0 last:pb-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-medium">{review.guest_name}</span>
                <span className="flex items-center gap-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current text-amber-500" />
                  ))}
                </span>
                <Badge variant={review.is_approved ? 'default' : 'secondary'}>
                  {review.is_approved ? 'Published' : 'Awaiting approval'}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
              {review.title && <p className="font-medium">{review.title}</p>}
              <p className="whitespace-pre-line text-sm text-muted-foreground">{review.body}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setApproved(review, !review.is_approved)}>
                  {review.is_approved ? 'Unpublish' : 'Approve'}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => deleteReview(review)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReviews;
