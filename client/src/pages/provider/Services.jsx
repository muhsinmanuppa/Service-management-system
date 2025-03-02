import React, { useState, useEffect } from 'react';
import { Card, CardContent, TextField, Button, Dialog, IconButton, Alert } from '@mui/material';
import { Edit, Delete, Upload } from 'lucide-react';
import api from '@/utils/axios';

const initialFormState = {
  name: '',
  description: '',
  price: '',
  duration: '',
  category: '',
  image: null
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchServices = async () => {
    try {
      const response = await api.get('/providers/services');
      setServices(response.data.services);
    } catch (error) {
      setError('Failed to fetch services');
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      
      // Append all form fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('duration', formData.duration);
      formDataToSend.append('category', formData.category);
      
      // Append image if selected
      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }

      if (editingId) {
        const response = await api.put(`/providers/services/${editingId}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        if (response.data.success) {
          setSuccess('Service updated successfully');
          await fetchServices();
          handleCloseDialog();
        } else {
          throw new Error(response.data.message);
        }
      } else {
        const response = await api.post('/providers/services', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        if (response.data.success) {
          setSuccess('Service added successfully');
          await fetchServices();
          handleCloseDialog();
        } else {
          throw new Error(response.data.message);
        }
      }
    } catch (error) {
      console.error('Operation failed:', error);
      setError(error.response?.data?.message || error.message || 'Operation failed');
    }
  };

  const handleEdit = (service) => {
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      category: service.category,
    });
    setEditingId(service._id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await api.delete(`/providers/services/${id}`);
        setSuccess('Service deleted successfully');
        await fetchServices();
      } catch (error) {
        setError('Failed to delete service');
      }
    }
  };

  const handleCloseDialog = () => {
    setFormData(initialFormState);
    setEditingId(null);
    setIsDialogOpen(false);
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Services</h1>
        <Button 
          variant="contained" 
          onClick={() => setIsDialogOpen(true)}
        >
          Add New Service
        </Button>
      </div>

      {(error || success) && (
        <Alert 
          severity={error ? "error" : "success"} 
          onClose={() => {
            setError('');
            setSuccess('');
          }}
          className="mb-4"
        >
          {error || success}
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <Card key={service._id}>
            <CardContent>
              <div className="flex justify-between">
                <h3 className="font-bold text-lg">{service.name}</h3>
                <div>
                  <IconButton onClick={() => handleEdit(service)} size="small">
                    <Edit className="w-4 h-4" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(service._id)} size="small">
                    <Delete className="w-4 h-4" />
                  </IconButton>
                </div>
              </div>
              <p className="text-gray-600">{service.description}</p>
              <div className="mt-2">
                <p>Price: ${service.price}</p>
                <p>Duration: {service.duration} minutes</p>
                <p>Category: {service.category}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog 
        open={isDialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? 'Edit Service' : 'Add New Service'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              fullWidth
              label="Service Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={3}
              required
            />
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Duration (minutes)"
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
            <div>
              <label className="block text-sm font-medium mb-1">Service Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="service-image"
              />
              <label htmlFor="service-image">
                <Button
                  component="span"
                  variant="outlined"
                  startIcon={<Upload />}
                  className="w-full"
                >
                  Upload Image
                </Button>
              </label>
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-h-40 object-contain"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button type="submit" variant="contained">
                {editingId ? 'Update' : 'Add'} Service
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Services;