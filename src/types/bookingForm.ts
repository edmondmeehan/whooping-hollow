
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
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  specialRequests: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema> & {
  status?: BookingStatus;
};
