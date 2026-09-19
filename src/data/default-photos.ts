import living from '@/assets/property/living.jpg.asset.json';
import kitchen from '@/assets/property/kitchen.jpg.asset.json';
import master from '@/assets/property/master.jpg.asset.json';
import backyard from '@/assets/property/backyard.jpg.asset.json';
import dining from '@/assets/property/dining.jpg.asset.json';
import bedroom from '@/assets/property/bedroom.jpg.asset.json';
import living2 from '@/assets/property/living2.jpg.asset.json';
import bath from '@/assets/property/bath.jpg.asset.json';
import front from '@/assets/property/front.jpg.asset.json';
import bedroom2 from '@/assets/property/bedroom2.jpg.asset.json';
import sleeper from '@/assets/property/sleeper.jpg.asset.json';
import bedroom3 from '@/assets/property/bedroom3.jpg.asset.json';
import bath2 from '@/assets/property/bath2.jpg.asset.json';
import living3 from '@/assets/property/living3.jpg.asset.json';
import inside from '@/assets/property/inside.jpg.asset.json';
import pool from '@/assets/property/pool.jpg.asset.json';

export interface DefaultPhoto {
  url: string;
  alt: string;
  wide?: boolean;
}

export const defaultPhotos: DefaultPhoto[] = [
  { url: living.url, alt: 'Living room', wide: true },
  { url: kitchen.url, alt: 'Kitchen' },
  { url: master.url, alt: 'Primary suite' },
  { url: backyard.url, alt: 'Backyard', wide: true },
  { url: dining.url, alt: 'Dining room' },
  { url: bedroom.url, alt: 'Bedroom' },
  { url: living2.url, alt: 'Living room' },
  { url: bath.url, alt: 'Bathroom' },
  { url: front.url, alt: 'Front of the house', wide: true },
  { url: bedroom2.url, alt: 'Bedroom' },
  { url: sleeper.url, alt: 'Double-sleeper room' },
  { url: bedroom3.url, alt: 'Bedroom' },
  { url: bath2.url, alt: 'Bathroom' },
  { url: living3.url, alt: 'Living room' },
  { url: inside.url, alt: 'Inside the house' },
];

export const defaultHeroPhoto = pool.url;
