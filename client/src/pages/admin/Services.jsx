import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { addCategory, deleteService } from '@/services/service.service'; // Ensure this import path is correct

// Dashboard Component
const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-2">Total Users</h2>
          <p className="text-3xl font-bold">1,245</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-2">Active Providers</h2>
          <p className="text-3xl font-bold">87</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-2">Services Listed</h2>
          <p className="text-3xl font-bold">156</p>
        </div>
      </div>
    </div>
  );
};

// Users Component
const Users = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* User rows would go here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Providers Component
const Providers = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Provider Management</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verification</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Provider rows would go here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Services Component
const Services = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      // API call to add category
      const response = await addCategory(newCategory);
      setCategories([...categories, response.data]);
      setIsAddCategoryDialogOpen(false);
      setNewCategory({ name: '', description: '' });
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      // API call to delete service
      await deleteService(serviceId);
      setServices(services.filter(service => service.id !== serviceId));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Services Management</h1>
        <Button onClick={() => setIsAddCategoryDialogOpen(true)}>
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{category.name}</h2>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <div className="space-y-2">
              {services
                .filter(service => service.categoryId === category.id)
                .map(service => (
                  <div key={service.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-gray-600">{service.providers} providers</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isAddCategoryDialogOpen} onOpenChange={setIsAddCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category Name</label>
              <Input
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="Enter category name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="w-full p-2 border rounded"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                rows={3}
                placeholder="Enter category description"
              />
            </div>
            <Button type="submit">Add Category</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Services;