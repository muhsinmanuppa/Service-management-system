import { apiService } from './api';
import { BOOKING_ENDPOINTS } from '../utils/constants';

/**
 * Booking related API functions
 */
const bookingService = {
  /**
   * Create a new booking
   * @param {Object} bookingData - Booking information
   * @returns {Promise} - Promise with booking confirmation
   */
  createBooking: async (bookingData) => {
    try {
      return await apiService.post(BOOKING_ENDPOINTS.BOOKINGS, bookingData);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Booking creation failed');
    }
  },

  /**
   * Get client's booking history
   * @param {Object} filters - Optional filter parameters
   * @returns {Promise} - Promise with booking history
   */
  getClientBookings: async (filters = {}) => {
    try {
      return await apiService.get(BOOKING_ENDPOINTS.CLIENT_BOOKINGS, filters);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch booking history');
    }
  },

  /**
   * Get provider's booking requests
   * @param {Object} filters - Optional filter parameters
   * @returns {Promise} - Promise with booking requests
   */
  getProviderBookings: async (filters = {}) => {
    try {
      return await apiService.get(BOOKING_ENDPOINTS.PROVIDER_BOOKINGS, filters);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch booking requests');
    }
  },

  /**
   * Get single booking details
   * @param {string} bookingId - Booking ID
   * @returns {Promise} - Promise with booking details
   */
  getBookingById: async (bookingId) => {
    try {
      return await apiService.get(`${BOOKING_ENDPOINTS.BOOKINGS}/${bookingId}`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch booking details');
    }
  },

  /**
   * Update booking status (accept, reject, cancel)
   * @param {string} bookingId - Booking ID
   * @param {string} status - New status
   * @param {string} reason - Optional reason for status change
   * @returns {Promise} - Promise with updated booking
   */
  updateBookingStatus: async (bookingId, status, reason = '') => {
    try {
      return await apiService.patch(`${BOOKING_ENDPOINTS.BOOKINGS}/${bookingId}/status`, {
        status,
        reason
      });
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update booking status');
    }
  },

  /**
   * Get provider's availability
   * @param {string} providerId - Provider ID
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @returns {Promise} - Promise with availability slots
   */
  getProviderAvailability: async (providerId, startDate, endDate) => {
    try {
      return await apiService.get(`${BOOKING_ENDPOINTS.AVAILABILITY}/${providerId}`, {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      });
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch provider availability');
    }
  },

  /**
   * Process payment for booking
   * @param {string} bookingId - Booking ID
   * @param {Object} paymentDetails - Payment information
   * @returns {Promise} - Promise with payment confirmation
   */
  processPayment: async (bookingId, paymentDetails) => {
    try {
      return await apiService.post(`${BOOKING_ENDPOINTS.BOOKINGS}/${bookingId}/payment`, paymentDetails);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Payment processing failed');
    }
  },

  /**
   * Complete a booking service
   * @param {string} bookingId - Booking ID
   * @returns {Promise} - Promise with completion status
   */
  completeBooking: async (bookingId) => {
    try {
      return await apiService.post(`${BOOKING_ENDPOINTS.BOOKINGS}/${bookingId}/complete`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to mark booking as complete');
    }
  },

  /**
   * Get booking analytics for providers
   * @param {Object} timeRange - Time range filter
   * @returns {Promise} - Promise with booking analytics
   */
  getBookingAnalytics: async (timeRange = {}) => {
    try {
      return await apiService.get(BOOKING_ENDPOINTS.ANALYTICS, timeRange);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch booking analytics');
    }
  },
  
  /**
   * Reschedule a booking
   * @param {string} bookingId - Booking ID
   * @param {Object} newSchedule - New schedule details
   * @returns {Promise} - Promise with rescheduled booking
   */
  rescheduleBooking: async (bookingId, newSchedule) => {
    try {
      return await apiService.patch(`${BOOKING_ENDPOINTS.BOOKINGS}/${bookingId}/reschedule`, newSchedule);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Booking reschedule failed');
    }
  }
};

export default bookingService;