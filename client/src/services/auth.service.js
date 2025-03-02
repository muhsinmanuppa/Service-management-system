import { apiService } from './api';
import { setAuthToken, removeAuthToken } from '../utils/axios';
import { AUTH_ENDPOINTS } from '../utils/constants';

export const register = async (userData) => {
  try {
    const response = await apiService.post(AUTH_ENDPOINTS.REGISTER, userData);
    const { token, user } = response;
    
    if (token) {
      localStorage.setItem('token', token);
      setAuthToken(token);
    }
    
    return { user, token };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const login = async (email, password) => {
  try {
    const response = await apiService.post(AUTH_ENDPOINTS.LOGIN, { email, password });
    const { token, user } = response;
    
    if (token) {
      localStorage.setItem('token', token);
      setAuthToken(token);
    }
    
    return { user, token };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const logout = async () => {
  try {
    await apiService.post(AUTH_ENDPOINTS.LOGOUT);
  } catch (error) {
    console.error('Logout API call failed:', error);
  } finally {
    localStorage.removeItem('token');
    removeAuthToken();
  }
  
  return { success: true };
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    
    setAuthToken(token);
    
    const response = await apiService.get(AUTH_ENDPOINTS.ME);
    
    return response.data?.user || response.data || response;
  } catch (error) {
    console.error('Get current user error:', error);
    localStorage.removeItem('token');
    removeAuthToken();
    throw new Error('Failed to get current user');
  }
};

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await apiService.post(AUTH_ENDPOINTS.REFRESH_TOKEN, { refreshToken });
    const { token } = response;
    
    if (token) {
      localStorage.setItem('token', token);
      setAuthToken(token);
      return token;
    }
    
    throw new Error('Failed to refresh token');
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    removeAuthToken();
    throw new Error('Token refresh failed');
  }
};

export const updateProfile = async (profileData) => {
  try {
    const updatedUser = await apiService.put(AUTH_ENDPOINTS.PROFILE, profileData);
    return updatedUser;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Profile update failed');
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await apiService.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, {
      currentPassword,
      newPassword
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Password change failed');
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await apiService.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to send reset email');
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await apiService.post(AUTH_ENDPOINTS.RESET_PASSWORD, {
      token,
      newPassword
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Password reset failed');
  }
};