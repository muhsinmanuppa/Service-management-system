import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { login as apiLogin, logout as apiLogout, getCurrentUser, refreshToken } from '../services/auth.service';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogin = useCallback(async (email, password) => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const { user, token } = await apiLogin(email, password);
      localStorage.setItem('token', token); // Save token to storage
      setCurrentUser(user);
      return user;
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    setLoading(true);
    try {
      await apiLogout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token'); // Clear token
      setCurrentUser(null);
      setLoading(false);
    }
  }, []);

  // Initial authentication check
  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const user = await getCurrentUser();
        if (isMounted) setCurrentUser(user);
      } catch (error) {
        console.error('Auth check failed:', error);

        try {
          const newToken = await refreshToken();
          if (newToken) {
            localStorage.setItem('token', newToken);
            const user = await getCurrentUser();
            if (isMounted) setCurrentUser(user);
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          localStorage.removeItem('token'); // Ensure invalid token is removed
          if (isMounted) {
            setError('Authentication failed');
            setCurrentUser(null);
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  // Memoize auth context value
  const value = useMemo(() => ({
    currentUser,
    loading,
    error,
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: !!currentUser,
    userRole: currentUser?.role || 'guest',
    isClient: currentUser?.role === 'client',
    isProvider: currentUser?.role === 'provider',
    isAdmin: currentUser?.role === 'admin',
  }), [currentUser, loading, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
