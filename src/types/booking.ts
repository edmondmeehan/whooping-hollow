
export type BookingStatus = 'new' | 'confirmed' | 'cancelled';

export interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  dates: string;
  guests: number;
  status: BookingStatus;
  message?: string;
  created_at?: string;
}
