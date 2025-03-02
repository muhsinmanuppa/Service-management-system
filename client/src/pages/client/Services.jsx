const Services = () => {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Available Services</h1>
        
        <div className="flex gap-4 mb-6">
          <select
            className="border rounded p-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="p-4">
              <h3 className="font-semibold">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <p className="font-bold">${service.price}</p>
                <Button onClick={() => navigate(`/client/book/${service.id}`)}>
                  Book Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  export default Services;