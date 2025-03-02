import { useState } from 'react';
import { Card } from '@/components/common';

const ServiceManagement = ({ services, onUpdate, onDelete }) => {
  const [editingService, setEditingService] = useState(null);

  const handleEdit = (service) => {
    setEditingService(service);
  };

  const handleSave = async (updatedService) => {
    try {
      await onUpdate(updatedService);
      setEditingService(null);
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  return (
    <div className="space-y-4">
      {services.map((service) => (
        <Card key={service.id} className="hover:shadow-md transition-shadow">
          {editingService?.id === service.id ? (
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSave({
                ...service,
                name: e.target.name.value,
                price: parseFloat(e.target.price.value),
                description: e.target.description.value,
              });
            }}>
              <div className="space-y-3">
                <input
                  name="name"
                  defaultValue={service.name}
                  className="w-full border rounded p-2"
                />
                <input
                  name="price"
                  type="number"
                  defaultValue={service.price}
                  className="w-full border rounded p-2"
                />
                <textarea
                  name="description"
                  defaultValue={service.description}
                  className="w-full border rounded p-2"
                />
                <div className="flex gap-2">
                  <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
                    Save
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setEditingService(null)}
                    className="bg-gray-200 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div>
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <span className="text-lg font-bold">${service.price}</span>
              </div>
              <p className="text-gray-600 mt-2">{service.description}</p>
              <div className="mt-4 flex gap-2">
                <button 
                  onClick={() => handleEdit(service)}
                  className="bg-primary text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(service.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default ServiceManagement;