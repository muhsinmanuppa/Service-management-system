import { apiService } from './api';

export const auditService = {
  logAction: async (actionData) => {
    try {
      const data = await apiService.post('/audit/log', actionData);
      return data;
    } catch (error) {
      throw new Error('Failed to log action');
    }
  },

  getAuditLogs: async () => {
    try {
      const data = await apiService.get('/audit/logs');
      return data;
    } catch (error) {
      throw new Error('Failed to fetch audit logs');
    }
  },
};