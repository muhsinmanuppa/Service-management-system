import { useState, useEffect, useRef, useCallback } from 'react';
import api from '../utils/axios';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isInitialized = useRef(false);
  const userChecked = useRef(false);

  // Use useCallback to memoize the auth functions
  const checkAuthStatus = useCallback(async () => {
    if (userChecked.current) return;
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        userChecked.current = true;
        return;
      }
  
      const response = await api.get('/auth/profile');
      const userData = response.data.user;
  
      if (userData) {
        setUser({
          ...userData,
          verified: userData.verified || false, // Ensure verified property exists
        });
      }
  
      userChecked.current = true;
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (formData) => {
    try {
      setIsLoading(true);
      const response = await api.post('/auth/login', formData);
      const { token, user } = response.data;
      
      if (token) {
        localStorage.setItem('token', token);
      }
      
      setUser(user);
      return user;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, []);

  const register = useCallback(async (formData) => {
    try {
      setIsLoading(true);
      const response = await api.post('/auth/register', formData);
      const { token, user } = response.data;
      
      if (token) {
        localStorage.setItem('token', token);
      }
      
      setUser(user);
      return user;
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const response = await api.get('/providers/profile');
      const userData = response.data.user;

      if (userData) {
        setUser(prevUser => ({
          ...prevUser,
          ...userData,
          verified: userData.verified || false,
        }));
      }
      return userData;
    } catch (error) {
      console.error('Profile refresh error:', error);
      throw error;
    }
  }, []);

  const updateProfile = useCallback(async (formData) => {
    try {
      setIsLoading(true);
      console.log('Sending update with data:', formData);
      
      const response = await api.put('/providers/profile', formData);
      console.log('Update response:', response.data);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Update failed');
      }

      const updatedUser = response.data.user;
      setUser(prevUser => ({
        ...prevUser,
        ...updatedUser
      }));

      return updatedUser;
    } catch (error) {
      console.error('Profile update error:', error);
      throw new Error(error.response?.data?.message || 'Profile update failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      checkAuthStatus();
    }

    // Cleanup function
    return () => {
      isInitialized.current = false;
      userChecked.current = false;
    };
  }, [checkAuthStatus]);

  return {
    user,
    login,
    logout,
    register,
    updateProfile,
    refreshProfile, // Add refreshProfile to the returned object
    isLoading
  };
};

export default useAuth;