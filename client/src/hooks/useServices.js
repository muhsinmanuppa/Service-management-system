import { useState, useCallback } from 'react';
import { http } from '@/utils/axios';

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchServices = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      const response = await http.get('/services', { params: filters });
      setServices(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await http.get('/services/categories');
      setCategories(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createService = async (serviceData) => {
    try {
      setLoading(true);
      const response = await http.post('/services', serviceData);
      setServices([...services, response.data.service]);
      return response.data.service;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateService = async (serviceId, serviceData) => {
    if (!serviceId) {
      throw new Error('Service ID is required');
    }

    try {
      setLoading(true);
      const response = await http.put(`/services/${serviceId}`, serviceData);
      setServices(services.map(service => 
        service._id === serviceId ? response.data.service : service
      ));
      return response.data.service;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (serviceId) => {
    try {
      setLoading(true);
      await http.delete(`/services/${serviceId}`);
      setServices(services.filter(service => service._id !== serviceId));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    services,
    categories,
    loading,
    error,
    fetchServices,
    fetchCategories,
    createService,
    updateService,
    deleteService
  };
};
export default useServices;