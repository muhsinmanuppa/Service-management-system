// Auth Endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',
  REFRESH_TOKEN: '/auth/refresh-token',
  PROFILE: '/auth/profile',
  CHANGE_PASSWORD: '/auth/change-password',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
};

// Booking Endpoints
export const BOOKING_ENDPOINTS = {
  CREATE: '/bookings/create',
  GET_ALL: '/bookings',
  GET_BY_ID: '/bookings/:id',
  UPDATE: '/bookings/update/:id',
  DELETE: '/bookings/delete/:id',
  CLIENT_BOOKINGS: '/bookings/client', // Endpoint for client-specific bookings
  PROVIDER_BOOKINGS: '/bookings/provider', // Endpoint for provider-specific bookings
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  UNAUTHORIZED: '/unauthorized',
  
  CLIENT: {
    ROOT: '/client',
    DASHBOARD: '/client/dashboard',
    SERVICES: '/client/services',
    BOOKINGS: '/client/bookings',
    PROFILE: '/client/profile',
  },
  
  PROVIDER: {
    ROOT: '/provider',
    DASHBOARD: '/provider/dashboard',
    SERVICES: '/provider/services',
    BOOKINGS: '/provider/bookings',
    PROFILE: '/provider/profile',
    REQUESTS: '/provider/requests',
  },
  
  ADMIN: {
    ROOT: '/admin',
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    SERVICES: '/admin/services',
    PROVIDERS: '/admin/providers',
  },
};

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },
  PROVIDER: {
    PROFILE: '/providers/profile',
    SERVICES: '/providers/services',
    REQUESTS: '/providers/requests',
  },
};