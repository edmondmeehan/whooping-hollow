
import { AirbnbImage } from '@/types/image';

// Cache configuration
const CACHE_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

// In-memory cache with expiration
export const imageCache = {
  data: null as AirbnbImage[] | null,
  timestamp: 0,
  
  get() {
    // Check if cache exists and is less than 5 minutes old
    const currentTime = Date.now();
    if (this.data && (currentTime - this.timestamp) < CACHE_EXPIRATION_TIME) {
      return this.data;
    }
    return null;
  },
  
  set(images: AirbnbImage[]) {
    this.data = images;
    this.timestamp = Date.now();
  },
  
  clear() {
    this.data = null;
    this.timestamp = 0;
  }
};
