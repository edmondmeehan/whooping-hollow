
import { PropertyLocation } from "@/types/booking";

export interface BookingFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: PropertyLocation;
  dates: { from: Date; to?: Date };
  guests: string;
  specialRequests: string;
}
