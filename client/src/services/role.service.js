import { apiService } from './api';

export const roleService = {
  getRoles: async () => {
    try {
      const data = await apiService.get('/roles');
      return data;
    } catch (error) {
      throw new Error('Failed to fetch roles');
    }
  },

  createRole: async (roleData) => {
    try {
      const data = await apiService.post('/roles', roleData);
      return data;
    } catch (error) {
      throw new Error('Failed to create role');
    }
  },

  updateRole: async (roleId, roleData) => {
    try {
      const data = await apiService.put(`/roles/${roleId}`, roleData);
      return data;
    } catch (error) {
      throw new Error('Failed to update role');
    }
  },

  deleteRole: async (roleId) => {
    try {
      const data = await apiService.delete(`/roles/${roleId}`);
      return data;
    } catch (error) {
      throw new Error('Failed to delete role');
    }
  },
};