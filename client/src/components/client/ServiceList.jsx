import { useState } from 'react';
import { Card } from '@/components/common';

const ServiceList = ({ services }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {/* Category filters */}
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === 'all' ? 'bg-primary text-white' : 'bg-gray-100'
          }`}
        >
          All
        </button>
        {/* Add more category buttons as needed */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold">{service.name}</h3>
            <p className="text-gray-600 mt-2">{service.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold">${service.price}</span>
              <button className="bg-primary text-white px-4 py-2 rounded-md">
                Book Now
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;