import { useState, useCallback } from 'react';
import { http } from '@/utils/axios';

export const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      const response = await http.get('/bookings', { params: filters });
      setBookings(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createBooking = async (bookingData) => {
    try {
      setLoading(true);
      const response = await http.post('/bookings', bookingData);
      setBookings([...bookings, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      setLoading(true);
      const response = await http.put(`/bookings/${bookingId}/status`, { status });
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? response.data : booking
      ));
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      setLoading(true);
      await http.delete(`/bookings/${bookingId}`);
      setBookings(bookings.filter(booking => booking.id !== bookingId));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getBookingStatistics = async () => {
    try {
      setLoading(true);
      const response = await http.get('/bookings/statistics');
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    createBooking,
    updateBookingStatus,
    cancelBooking,
    getBookingStatistics
  };
};
export default useBookings;