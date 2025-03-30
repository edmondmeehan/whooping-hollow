
export type BookingStatus = 'new' | 'confirmed' | 'cancelled' | 'blocked';

export interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children?: number;
  status: BookingStatus;
  message?: string;
  created_at?: string;
  isBlockedDate?: boolean; // For admin-created blocked dates
  notes?: string; // For cleaning notes or other admin annotations
}
