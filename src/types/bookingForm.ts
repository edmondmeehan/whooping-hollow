
import { z } from 'zod';
import { BookingStatus } from '@/types/booking';

export const propertyLocationEnum = [
  'whooping_hollow',
  'nashville_downtown',
  'nashville_music_row'
] as const;

export type PropertyLocation = typeof propertyLocationEnum[number];

export const bookingFormSchema = z.object({
  property: z.enum(propertyLocationEnum),
  checkIn: z.date({
    required_error: "Check-in date is required",
  }),
  checkOut: z.date({
    required_error: "Check-out date is required",
  }),
  adults: z.number().min(1, "At least 1 adult is required"),
  children: z.number().min(0).optional(),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  specialRequests: z.string().optional(),
}).refine(data => {
  // Ensure checkOut is after checkIn and both are valid dates
  return data.checkOut && data.checkIn && data.checkOut > data.checkIn;
}, {
  message: "Check-out date must be after check-in date",
  path: ["checkOut"],
});

export type BookingFormValues = z.infer<typeof bookingFormSchema> & {
  status?: BookingStatus;
};

// Add this type to match with emailUtils.ts
export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  dates: { from: Date; to?: Date };
  guests: string;
  specialRequests?: string;
}
