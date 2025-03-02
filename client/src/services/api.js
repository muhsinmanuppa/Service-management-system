// src/services/api.js
import axios from '../utils/axios';

// General purpose API service with common CRUD operations
export const apiService = {
  /**
   * Perform a GET request to fetch data
   * @param {string} endpoint - API endpoint
   * @param {Object} params - Query parameters
   * @returns {Promise} - Promise resolving to response data
   */
  get: async (endpoint, params = {}) => {
    try {
      const response = await axios.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch data');
    }
  },

  /**
   * Perform a POST request to create data
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request payload
   * @returns {Promise} - Promise resolving to response data
   */
  post: async (endpoint, data = {}) => {
    try {
      const response = await axios.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to create data');
    }
  },

  /**
   * Perform a PUT request to update data
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request payload
   * @returns {Promise} - Promise resolving to response data
   */
  put: async (endpoint, data = {}) => {
    try {
      const response = await axios.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to update data');
    }
  },

  /**
   * Perform a PATCH request for partial updates
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request payload with partial updates
   * @returns {Promise} - Promise resolving to response data
   */
  patch: async (endpoint, data = {}) => {
    try {
      const response = await axios.patch(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to patch data');
    }
  },

  /**
   * Perform a DELETE request
   * @param {string} endpoint - API endpoint
   * @returns {Promise} - Promise resolving to response data
   */
  delete: async (endpoint) => {
    try {
      const response = await axios.delete(endpoint);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to delete data');
    }
  },

  /**
   * Upload file(s)
   * @param {string} endpoint - API endpoint
   * @param {FormData} formData - Form data with files
   * @param {Function} onProgress - Progress callback function
   * @returns {Promise} - Promise resolving to response data
   */
  upload: async (endpoint, formData, onProgress = null) => {
    try {
      const config = onProgress ? {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      } : {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const response = await axios.post(endpoint, formData, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to upload file(s)');
    }
  },

  /**
   * Handle API errors
   * @param {Error} error - Error object
   * @param {string} defaultMessage - Default error message
   * @returns {Error} - Formatted error object
   * @private
   */
  handleError: (error, defaultMessage) => {
    const errorMessage = error.response?.data?.message || error.message || defaultMessage;
    
    return {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
      original: error
    };
  }
};