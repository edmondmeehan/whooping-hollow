
import { AirbnbImage } from '@/types/image';

// Fallback demo images when database connection fails
export const demoAdminImages: AirbnbImage[] = [
  {
    id: 101,
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    alt: 'Demo Property Exterior',
    created_at: new Date().toISOString()
  },
  {
    id: 102,
    url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
    alt: 'Demo Living Room',
    created_at: new Date().toISOString()
  }
];
