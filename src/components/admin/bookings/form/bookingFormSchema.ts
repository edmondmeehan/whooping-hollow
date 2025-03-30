
import { z } from 'zod';
import { BookingStatus } from '@/types/booking';

export const createBookingSchema = (isBlocking: boolean) => z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: isBlocking ? z.string().optional() : z.string().email({ message: 'Valid email is required' }),
  phone: isBlocking ? z.string().optional() : z.string().min(5, { message: 'Phone number is required' }),
  checkIn: z.date({ required_error: 'Check-in date is required' }),
  checkOut: z.date({ required_error: 'Check-out date is required' })
    .refine(date => date > new Date(), { message: 'Check-out date must be in the future' }),
  adults: isBlocking ? z.number().default(0) : z.number().min(1, { message: 'At least 1 adult is required' }),
  children: z.number().min(0).optional(),
  message: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(['new', 'confirmed', 'cancelled', 'blocked'] as const),
})
.refine(data => data.checkOut > data.checkIn, {
  message: 'Check-out date must be after check-in date',
  path: ['checkOut'],
});

export type BookingFormValues = z.infer<ReturnType<typeof createBookingSchema>>;
