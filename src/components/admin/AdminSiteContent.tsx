import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useSiteContent } from '@/hooks/use-site-content';
import { SiteContent } from '@/types/site-content';

const AdminSiteContent = () => {
  const { content, updateContent, resetContent } = useSiteContent();
  const [draft, setDraft] = useState<SiteContent>(content);
  const { toast } = useToast();

  const set = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    updateContent(draft);
    toast({ title: 'Home page saved', description: 'Your changes are live on the home page.' });
  };

  const handleReset = () => {
    const defaults = resetContent();
    setDraft(defaults);
    toast({ title: 'Reset to the original design text' });
  };

  const linesToList = (value: string) =>
    value
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold">Home Page Content</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            Reset to defaults
          </Button>
          <Button onClick={handleSave}>Save changes</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top of the page</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Site name</Label>
            <Input value={draft.brandName} onChange={(e) => set('brandName', e.target.value)} />
          </div>
          <div>
            <Label>Small label above the headline</Label>
            <Input value={draft.eyebrow} onChange={(e) => set('eyebrow', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Label>Headline</Label>
            <Input value={draft.headline} onChange={(e) => set('headline', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Label>Intro paragraph</Label>
            <Textarea rows={3} value={draft.intro} onChange={(e) => set('intro', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Label>Main photo (web address)</Label>
            <Input value={draft.heroImageUrl} onChange={(e) => set('heroImageUrl', e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Booking links & contact</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Airbnb link</Label>
            <Input value={draft.airbnbUrl} onChange={(e) => set('airbnbUrl', e.target.value)} />
          </div>
          <div>
            <Label>StayMarquis link</Label>
            <Input value={draft.marquisUrl} onChange={(e) => set('marquisUrl', e.target.value)} />
          </div>
          <div>
            <Label>Phone number (for the text link)</Label>
            <Input value={draft.phone} onChange={(e) => set('phone', e.target.value)} />
          </div>
          <div>
            <Label>Phone number as shown</Label>
            <Input value={draft.phoneDisplay} onChange={(e) => set('phoneDisplay', e.target.value)} />
          </div>
          <div>
            <Label>Email address</Label>
            <Input value={draft.email} onChange={(e) => set('email', e.target.value)} />
          </div>
          <div>
            <Label>Address</Label>
            <Input value={draft.address} onChange={(e) => set('address', e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Highlights & amenities</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Highlights strip (one per line)</Label>
            <Textarea
              rows={6}
              value={draft.highlights.join('\n')}
              onChange={(e) => set('highlights', linesToList(e.target.value))}
            />
          </div>
          <div>
            <Label>Amenities list (one per line)</Label>
            <Textarea
              rows={10}
              value={draft.amenities.join('\n')}
              onChange={(e) => set('amenities', linesToList(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>The house — three numbers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {draft.stats.map((stat, index) => (
            <div key={stat.id} className="grid gap-3 md:grid-cols-[100px_140px_1fr]">
              <Input
                value={stat.value}
                onChange={(e) => {
                  const next = [...draft.stats];
                  next[index] = { ...stat, value: e.target.value };
                  set('stats', next);
                }}
              />
              <Input
                value={stat.unit}
                onChange={(e) => {
                  const next = [...draft.stats];
                  next[index] = { ...stat, unit: e.target.value };
                  set('stats', next);
                }}
              />
              <Input
                value={stat.caption}
                onChange={(e) => {
                  const next = [...draft.stats];
                  next[index] = { ...stat, caption: e.target.value };
                  set('stats', next);
                }}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Where it is</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Section heading</Label>
            <Input value={draft.whereHeading} onChange={(e) => set('whereHeading', e.target.value)} />
          </div>
          <div>
            <Label>Map address</Label>
            <Input value={draft.mapQuery} onChange={(e) => set('mapQuery', e.target.value)} />
          </div>
          <div className="space-y-3">
            <Label>Drive times</Label>
            {draft.distances.map((row, index) => (
              <div key={row.id} className="grid gap-3 md:grid-cols-[1fr_140px_auto]">
                <Input
                  value={row.label}
                  onChange={(e) => {
                    const next = [...draft.distances];
                    next[index] = { ...row, label: e.target.value };
                    set('distances', next);
                  }}
                />
                <Input
                  value={row.time}
                  onChange={(e) => {
                    const next = [...draft.distances];
                    next[index] = { ...row, time: e.target.value };
                    set('distances', next);
                  }}
                />
                <Button
                  variant="outline"
                  onClick={() => set('distances', draft.distances.filter((_, i) => i !== index))}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() =>
                set('distances', [
                  ...draft.distances,
                  { id: `row-${Date.now()}`, label: '', time: '' },
                ])
              }
            >
              Add a place
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nashville listings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Note next to the heading</Label>
            <Input value={draft.nashvilleNote} onChange={(e) => set('nashvilleNote', e.target.value)} />
          </div>
          {draft.nashville.map((listing, index) => (
            <div key={listing.id} className="grid gap-3 rounded-lg border p-4 md:grid-cols-2">
              <div>
                <Label>Name</Label>
                <Input
                  value={listing.title}
                  onChange={(e) => {
                    const next = [...draft.nashville];
                    next[index] = { ...listing, title: e.target.value };
                    set('nashville', next);
                  }}
                />
              </div>
              <div>
                <Label>Rating</Label>
                <Input
                  value={listing.rating}
                  onChange={(e) => {
                    const next = [...draft.nashville];
                    next[index] = { ...listing, rating: e.target.value };
                    set('nashville', next);
                  }}
                />
              </div>
              <div className="md:col-span-2">
                <Label>Details line</Label>
                <Input
                  value={listing.meta}
                  onChange={(e) => {
                    const next = [...draft.nashville];
                    next[index] = { ...listing, meta: e.target.value };
                    set('nashville', next);
                  }}
                />
              </div>
              <div>
                <Label>Airbnb link</Label>
                <Input
                  value={listing.url}
                  onChange={(e) => {
                    const next = [...draft.nashville];
                    next[index] = { ...listing, url: e.target.value };
                    set('nashville', next);
                  }}
                />
              </div>
              <div>
                <Label>Photo (web address)</Label>
                <Input
                  value={listing.imageUrl}
                  onChange={(e) => {
                    const next = [...draft.nashville];
                    next[index] = { ...listing, imageUrl: e.target.value };
                    set('nashville', next);
                  }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Booking banner & footer</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Banner heading</Label>
            <Input value={draft.bannerTitle} onChange={(e) => set('bannerTitle', e.target.value)} />
          </div>
          <div>
            <Label>Banner subtext</Label>
            <Input value={draft.bannerSubtitle} onChange={(e) => set('bannerSubtitle', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Label>Footer note</Label>
            <Input value={draft.footerNote} onChange={(e) => set('footerNote', e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button onClick={handleSave}>Save changes</Button>
      </div>
    </div>
  );
};

export default AdminSiteContent;
