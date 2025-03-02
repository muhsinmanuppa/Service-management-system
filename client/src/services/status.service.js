import { apiService } from './api';

export const statusService = {
  getStatuses: async () => {
    try {
      const data = await apiService.get('/statuses');
      return data;
    } catch (error) {
      throw new Error('Failed to fetch statuses');
    }
  },

  createStatus: async (statusData) => {
    try {
      const data = await apiService.post('/statuses', statusData);
      return data;
    } catch (error) {
      throw new Error('Failed to create status');
    }
  },

  updateStatus: async (statusId, statusData) => {
    try {
      const data = await apiService.put(`/statuses/${statusId}`, statusData);
      return data;
    } catch (error) {
      throw new Error('Failed to update status');
    }
  },

  deleteStatus: async (statusId) => {
    try {
      const data = await apiService.delete(`/statuses/${statusId}`);
      return data;
    } catch (error) {
      throw new Error('Failed to delete status');
    }
  },
};