
export type PropertyLocation = "montauk" | "nashville";
export type BookingStatus = "new" | "contacted" | "confirmed" | "cancelled";

export interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  dates: string;
  guests: number;
  status: BookingStatus;
  message: string;
}
