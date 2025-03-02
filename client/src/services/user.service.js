import { apiService } from './api';

export const userService = {
  getUsersByRole: async (role) => {
    try {
      const data = await apiService.get('/users', { role });
      return data;
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  },

  updateUserStatus: async (userId, newStatus) => {
    try {
      const data = await apiService.put(`/users/${userId}/status`, { status: newStatus });
      return data;
    } catch (error) {
      throw new Error('Failed to update user status');
    }
  },

  deleteUser: async (userId) => {
    try {
      const data = await apiService.delete(`/users/${userId}`);
      return data;
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  },

  createUser: async (userData) => {
    try {
      const data = await apiService.post('/users', userData);
      return data;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  },

  getUserById: async (userId) => {
    try {
      const data = await apiService.get(`/users/${userId}`);
      return data;
    } catch (error) {
      throw new Error('Failed to fetch user details');
    }
  },
};