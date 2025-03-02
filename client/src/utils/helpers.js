import { DATE_FORMATS } from './constants';
import dayjs from 'dayjs';

/**
 * Format date to display format
 * @param {string|Date} date - Date to format
 * @param {string} format - Format string (from constants)
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, format = DATE_FORMATS.DISPLAY_DATE) => {
  if (!date) return '';
  return dayjs(date).format(format);
};

/**
 * Format currency amount
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
};

/**
 * Truncate text to a specific length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} - Truncated text
 */
export const truncateText = (text, length = 100) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Convert file size in bytes to human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Debounce function to limit execution frequency
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} - Cloned object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Generate a random ID
 * @param {number} length - ID length
 * @returns {string} - Random ID
 */
export const generateId = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Calculate time difference in a human-readable format
 * @param {string|Date} startDate - Start date
 * @param {string|Date} endDate - End date (default: now)
 * @returns {string} - Formatted time difference
 */
export const getTimeDifference = (startDate, endDate = new Date()) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const diffInMinutes = end.diff(start, 'minute');
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''}`;
  }
  
  const diffInHours = end.diff(start, 'hour');
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''}`;
  }
  
  const diffInDays = end.diff(start, 'day');
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''}`;
  }
  
  const diffInMonths = end.diff(start, 'month');
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''}`;
  }
  
  const diffInYears = end.diff(start, 'year');
  return `${diffInYears} year${diffInYears !== 1 ? 's' : ''}`;
};

/**
 * Extract query parameters from URL
 * @returns {Object} - Object with query parameters
 */
export const getQueryParams = () => {
  const params = {};
  const queryString = window.location.search.substring(1);
  const pairs = queryString.split('&');
  
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    if (pair[0]) {
      params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
  }
  
  return params;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid email
 */
export const isValidEmail = (email) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(email);
};

/**
 * Convert camelCase to Title Case
 * @param {string} text - CamelCase text
 * @returns {string} - Title Case text
 */
export const camelToTitleCase = (text) => {
  if (!text) return '';
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} - Initials
 */
export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

/**
 * Calculate average rating from reviews array
 * @param {Array} reviews - Array of review objects with rating property
 * @returns {number} - Average rating rounded to 1 decimal place
 */
export const calculateAverageRating = (reviews) => {
  if (!reviews || !reviews.length) return 0;
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

/**
 * Check if an object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} - Is empty object
 */
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Safely access nested object properties
 * @param {Object} obj - Object to access
 * @param {string} path - Property path (e.g., 'user.address.city')
 * @param {*} defaultValue - Default value if path doesn't exist
 * @returns {*} - Property value or default value
 */
export const getNestedValue = (obj, path, defaultValue = null) => {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === null || result === undefined || !result.hasOwnProperty(key)) {
      return defaultValue;
    }
    result = result[key];
  }
  
  return result === undefined ? defaultValue : result;
};