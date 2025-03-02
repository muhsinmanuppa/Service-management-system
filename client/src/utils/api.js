import { http as api } from '@/utils/axios';
import toast from 'react-hot-toast';

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    // Handle request errors
    toast.error('Request failed. Please try again.');
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Return successful responses
    return response.data;
  },
  (error) => {
    // Handle different error scenarios
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    
    // Handle different status codes
    switch (error.response?.status) {
      case 401:
        // Unauthorized - clear local storage and redirect to login
        localStorage.clear();
        window.location.href = '/login';
        toast.error('Session expired. Please login again.');
        break;
      
      case 403:
        // Forbidden
        toast.error('You do not have permission to perform this action');
        break;
      
      case 404:
        // Not found
        toast.error('Resource not found');
        break;
      
      case 422:
        // Validation errors
        const validationErrors = error.response?.data?.errors;
        if (validationErrors) {
          Object.values(validationErrors).forEach(error => {
            toast.error(error);
          });
        } else {
          toast.error(errorMessage);
        }
        break;
      
      case 500:
        // Server error
        toast.error('Server error. Please try again later.');
        break;
      
      default:
        // Other errors
        toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);

// API wrapper functions
const apiWrapper = {
  get: async (url, config = {}) => {
    try {
      const response = await api.get(url, config);
      return response;
    } catch (error) {
      throw error;
    }
  },

  post: async (url, data = {}, config = {}) => {
    try {
      const response = await api.post(url, data, config);
      return response;
    } catch (error) {
      throw error;
    }
  },

  put: async (url, data = {}, config = {}) => {
    try {
      const response = await api.put(url, data, config);
      return response;
    } catch (error) {
      throw error;
    }
  },

  patch: async (url, data = {}, config = {}) => {
    try {
      const response = await api.patch(url, data, config);
      return response;
    } catch (error) {
      throw error;
    }
  },

  delete: async (url, config = {}) => {
    try {
      const response = await api.delete(url, config);
      return response;
    } catch (error) {
      throw error;
    }
  }
};

export default apiWrapper;