import poolAsset from '@/assets/property/pool.jpg.asset.json';

export interface NashvilleListing {
  id: string;
  title: string;
  meta: string;
  rating: string;
  url: string;
  imageUrl: string;
}

export interface DistanceRow {
  id: string;
  label: string;
  time: string;
}

export interface StatItem {
  id: string;
  value: string;
  unit: string;
  caption: string;
}

export interface SiteContent {
  brandName: string;
  eyebrow: string;
  headline: string;
  intro: string;
  heroImageUrl: string;
  airbnbUrl: string;
  marquisUrl: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  highlights: string[];
  stats: StatItem[];
  amenities: string[];
  whereHeading: string;
  distances: DistanceRow[];
  mapQuery: string;
  nashvilleNote: string;
  nashville: NashvilleListing[];
  bannerTitle: string;
  bannerSubtitle: string;
  address: string;
  footerNote: string;
}

export const defaultSiteContent: SiteContent = {
  brandName: 'Whooping Hollow',
  eyebrow: 'EAST HAMPTON, NY',
  headline: 'Your Hamptons house with a heated pool.',
  intro:
    '4 bedrooms, sleeps 8. Halfway between East Hampton Village and Sag Harbor, backing onto a 21\u2011acre nature preserve.',
  heroImageUrl: poolAsset.url,
  airbnbUrl: 'https://www.airbnb.com/rooms/1314531825053234635',
  marquisUrl: 'https://staymarquis.com/properties/whooping-hollow-haven',
  phone: '+19166165376',
  phoneDisplay: '916\u2011616\u20115376',
  email: 'eddie@please.co',
  highlights: [
    'Heated pool',
    'Fire pit',
    'Wood\u2011burning fireplace',
    'Outdoor shower',
    '10 min to the beach',
  ],
  stats: [
    {
      id: 'bedrooms',
      value: '4',
      unit: 'bedrooms',
      caption: 'Primary suite, two queens, and a double\u2011sleeper room for kids.',
    },
    {
      id: 'baths',
      value: '2',
      unit: 'baths',
      caption: 'Renovated, plus an outdoor shower for after the beach.',
    },
    {
      id: 'acres',
      value: '.62',
      unit: 'acres',
      caption: 'Private, elevated lot bordering a 21\u2011acre preserve.',
    },
  ],
  amenities: [
    'Heated pool',
    'Fire pit',
    'Wood\u2011burning fireplace',
    'Open kitchen',
    'Outdoor dining & grill',
    'Outdoor shower',
    'Fast Wi-Fi',
    'Central air',
    'Washer & dryer',
    'Garage parking',
  ],
  whereHeading: 'Between East Hampton Village and Sag Harbor.',
  distances: [
    { id: 'village', label: 'East Hampton Village', time: '5 min' },
    { id: 'sag', label: 'Sag Harbor', time: '8 min' },
    { id: 'beach', label: 'Main Beach', time: '10 min' },
    { id: 'jitney', label: 'Hampton Jitney', time: '6 min' },
    { id: 'lirr', label: 'East Hampton train station (LIRR)', time: '5 min' },
    { id: 'shopping', label: 'Newtown Lane & Main St shopping', time: '5 min' },
    { id: 'grocery', label: 'Grocery (Stop & Shop, Citarella)', time: '5 min' },
  ],
  mapQuery: '26 Whooping Hollow Rd, East Hampton, NY 11937',
  nashvilleNote: 'Three townhomes in East Nashville, minutes from Broadway.',
  nashville: [
    {
      id: 'jailhouse',
      title: 'The Jailhouse Rock',
      meta: '4 bed \u00b7 4.5 bath \u00b7 sleeps 11 \u00b7 rooftop skyline view',
      rating: '4.77',
      url: 'https://www.airbnb.com/rooms/610077025200442937',
      imageUrl:
        'https://a0.muscache.com/im/pictures/prohost-api/Hosting-610077025200442937/original/365e8fc3-4450-417e-8ed7-6d372e6a168c.jpeg?im_w=720',
    },
    {
      id: 'gibson',
      title: 'The Gibson',
      meta: '3 bed \u00b7 3.5 bath \u00b7 sleeps 10 \u00b7 3 min to Broadway',
      rating: '4.61',
      url: 'https://www.airbnb.com/rooms/14503480',
      imageUrl:
        'https://a0.muscache.com/im/pictures/prohost-api/Hosting-14503480/original/b276732f-9dc4-451d-b00d-a9312882fc63.jpeg?im_w=720',
    },
    {
      id: 'goodtimes',
      title: 'Let the Good Times Roll',
      meta: '4 bed \u00b7 4.5 bath \u00b7 sleeps 10 \u00b7 rooftop skyline view',
      rating: '4.76',
      url: 'https://www.airbnb.com/rooms/610164155811801435',
      imageUrl:
        'https://a0.muscache.com/im/pictures/prohost-api/Hosting-610164155811801435/original/abaf62fb-28a7-4ddc-8810-4167e30fcc6e.jpeg?im_w=720',
    },
  ],
  bannerTitle: 'Weekly and seasonal stays',
  bannerSubtitle: 'Rates and open dates are live on Airbnb.',
  address: '26 Whooping Hollow Rd, East Hampton, NY 11937',
  footerNote: 'Rental registration on file',
};
