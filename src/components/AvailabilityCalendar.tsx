import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { addDays, isSameDay, isWithinInterval } from 'date-fns';

interface BookedDate {
  checkIn: Date;
  checkOut: Date;
}

const AvailabilityCalendar = () => {
  const [bookedDates, setBookedDates] = useState<BookedDate[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchBookedDates();
  }, []);

  const fetchBookedDates = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('booking_requests')
        .select('check_in, check_out, status')
        .in('status', ['confirmed', 'approved']);

      if (error) throw error;

      const dates = data?.map(booking => ({
        checkIn: new Date(booking.check_in),
        checkOut: new Date(booking.check_out),
      })) || [];

      setBookedDates(dates);
    } catch (error: any) {
      console.error('Error fetching booked dates:', error);
      toast({
        title: 'Error loading calendar',
        description: 'Unable to load booking information. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const isDateBooked = (date: Date): boolean => {
    return bookedDates.some(booking => {
      try {
        return isWithinInterval(date, {
          start: booking.checkIn,
          end: addDays(booking.checkOut, -1), // Don't mark checkout day as booked
        });
      } catch {
        return false;
      }
    });
  };

  const modifiers = {
    booked: (date: Date) => isDateBooked(date),
  };

  const modifiersStyles = {
    booked: {
      backgroundColor: 'hsl(var(--muted))',
      color: 'hsl(var(--muted-foreground))',
      textDecoration: 'line-through',
      opacity: 0.6,
    },
  };

  if (loading) {
    return (
      <Card className="border-border shadow-[var(--shadow-soft)]">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border shadow-[var(--shadow-elegant)] overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8">
          <div className="flex flex-wrap gap-6 justify-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-background border border-border"></div>
              <span className="text-sm text-foreground">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-muted border border-border opacity-60"></div>
              <span className="text-sm text-muted-foreground">Booked</span>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="inline-block bg-background rounded-lg p-6 shadow-[var(--shadow-soft)]">
              <Calendar
                mode="default"
                numberOfMonths={2}
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                disabled={{ before: new Date() }}
                className="border-0"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-background p-6 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            Calendar shows the next 2 months. For availability beyond this period, please{' '}
            <a href="/book-direct" className="text-primary hover:underline font-medium">
              submit a booking request
            </a>
            .
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilityCalendar;
