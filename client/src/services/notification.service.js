import { apiService } from './api';

export const notificationService = {
  sendEmailNotification: async (emailData) => {
    try {
      const data = await apiService.post('/notifications/email', emailData);
      return data;
    } catch (error) {
      throw new Error('Failed to send email notification');
    }
  },

  sendSMSNotification: async (smsData) => {
    try {
      const data = await apiService.post('/notifications/sms', smsData);
      return data;
    } catch (error) {
      throw new Error('Failed to send SMS notification');
    }
  },
};