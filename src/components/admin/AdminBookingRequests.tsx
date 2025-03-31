
import React, { useState } from 'react';
import { useBookingRequests, BookingRequest, BookingRequestStatus } from '@/hooks/use-booking-requests';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { format, differenceInDays } from 'date-fns';
import { Loader2, RefreshCw, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import StatusBadge from './bookings/StatusBadge';

const AdminBookingRequests = () => {
  const {
    bookingRequests,
    isLoading,
    error,
    statusFilter,
    setStatusFilter,
    refreshBookingRequests,
    handleStatusChange,
    handleDeleteBooking
  } = useBookingRequests();

  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshBookingRequests();
    setIsRefreshing(false);
    toast.success('Booking requests refreshed');
  };

  const openBookingDetails = (booking: BookingRequest) => {
    setSelectedBooking(booking);
  };

  const closeBookingDetails = () => {
    setSelectedBooking(null);
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    const success = await handleStatusChange(bookingId, newStatus);
    
    if (success) {
      toast.success('Booking status updated');
      // Update the selected booking if it's the one being viewed
      if (selectedBooking && selectedBooking.id === bookingId) {
        setSelectedBooking(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } else {
      toast.error('Failed to update booking status');
    }
  };

  const deleteBooking = async (bookingId: string) => {
    if (confirm('Are you sure you want to delete this booking request?')) {
      const success = await handleDeleteBooking(bookingId);
      
      if (success) {
        toast.success('Booking request deleted');
        if (selectedBooking && selectedBooking.id === bookingId) {
          closeBookingDetails();
        }
      } else {
        toast.error('Failed to delete booking request');
      }
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'MMM dd, yyyy');
    } catch (e) {
      return dateStr;
    }
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    try {
      return differenceInDays(new Date(checkOut), new Date(checkIn));
    } catch (e) {
      return 0;
    }
  };

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <Button onClick={refreshBookingRequests}>Try Again</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-semibold">Direct Booking Requests</h2>
        
        <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-3">
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as BookingRequestStatus)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Requests</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            onClick={handleRefresh} 
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  <p className="mt-2 text-muted-foreground">Loading booking requests...</p>
                </TableCell>
              </TableRow>
            ) : bookingRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <p className="text-muted-foreground">No booking requests found</p>
                </TableCell>
              </TableRow>
            ) : (
              bookingRequests.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    {booking.first_name} {booking.last_name}
                  </TableCell>
                  <TableCell>{booking.property.replace('_', ' ')}</TableCell>
                  <TableCell>
                    {formatDate(booking.check_in)} - {formatDate(booking.check_out)}
                    <div className="text-xs text-muted-foreground">
                      {calculateNights(booking.check_in, booking.check_out)} nights
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={booking.status as any} />
                  </TableCell>
                  <TableCell>
                    {formatDate(booking.created_at)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => openBookingDetails(booking)}
                        title="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => deleteBooking(booking.id)}
                        title="Delete request"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Booking Details Dialog */}
      {selectedBooking && (
        <Dialog open={!!selectedBooking} onOpenChange={(open) => !open && closeBookingDetails()}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Booking Request Details</DialogTitle>
              <DialogDescription>
                Request submitted on {formatDate(selectedBooking.created_at)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Guest Information</h3>
                <p>
                  {selectedBooking.first_name} {selectedBooking.last_name}
                </p>
                <p className="text-sm">
                  <a href={`mailto:${selectedBooking.email}`} className="text-blue-600 hover:underline">
                    {selectedBooking.email}
                  </a>
                </p>
                <p className="text-sm">
                  <a href={`tel:${selectedBooking.phone}`} className="text-blue-600 hover:underline">
                    {selectedBooking.phone}
                  </a>
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Booking Details</h3>
                <p>Property: {selectedBooking.property.replace('_', ' ')}</p>
                <p>
                  Dates: {formatDate(selectedBooking.check_in)} - {formatDate(selectedBooking.check_out)}
                  <span className="text-sm text-muted-foreground ml-2">
                    ({calculateNights(selectedBooking.check_in, selectedBooking.check_out)} nights)
                  </span>
                </p>
                <p>Guests: {selectedBooking.adults + selectedBooking.children} total
                  {selectedBooking.children > 0 && 
                    <span className="text-sm text-muted-foreground ml-2">
                      ({selectedBooking.adults} adults, {selectedBooking.children} children)
                    </span>
                  }
                </p>
              </div>
              
              {selectedBooking.special_requests && (
                <div>
                  <h3 className="font-medium mb-1">Special Requests</h3>
                  <p className="text-sm whitespace-pre-line">{selectedBooking.special_requests}</p>
                </div>
              )}
              
              <div>
                <h3 className="font-medium mb-1">Status</h3>
                <div className="flex items-center gap-3">
                  <StatusBadge status={selectedBooking.status as any} />
                  <Select
                    value={selectedBooking.status}
                    onValueChange={(value) => updateBookingStatus(selectedBooking.id, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Change status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="destructive"
                onClick={() => deleteBooking(selectedBooking.id)}
                className="mr-auto"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Request
              </Button>
              <Button variant="outline" onClick={closeBookingDetails}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminBookingRequests;
