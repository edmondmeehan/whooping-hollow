
import { supabase } from "@/integrations/supabase/client";
import { BookingFormValues } from "@/types/bookingForm";
import { format } from "date-fns";

export interface BookingSubmissionData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  property: string;
  check_in: string;
  check_out: string;
  adults: number;
  children?: number;
  special_requests?: string;
}

export async function submitBookingToSupabase(formData: BookingFormValues): Promise<{ success: boolean; error?: string }> {
  try {
    // Format dates for Supabase
    const submissionData: BookingSubmissionData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      property: formData.property,
      check_in: format(formData.checkIn, 'yyyy-MM-dd'),
      check_out: format(formData.checkOut, 'yyyy-MM-dd'),
      adults: formData.adults,
      children: formData.children || 0,
      special_requests: formData.specialRequests,
    };

    // Submit to Supabase - making sure we're using the correct table
    const { error } = await supabase
      .from('booking_requests')
      .insert(submissionData);

    if (error) {
      console.error('Error submitting booking:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in submitBookingToSupabase:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
}

export async function fetchBookingRequests() {
  try {
    const { data, error } = await supabase
      .from('booking_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching booking requests:', error);
      return { success: false, error: error.message, data: null };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error in fetchBookingRequests:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred',
      data: null
    };
  }
}

export async function updateBookingStatus(id: string, status: string) {
  try {
    const { error } = await supabase
      .from('booking_requests')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating booking status:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in updateBookingStatus:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
}

export async function deleteBookingRequest(id: string) {
  try {
    const { error } = await supabase
      .from('booking_requests')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting booking request:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in deleteBookingRequest:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
}
