const ServiceCategories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  
    const handleAddCategory = async () => {
      try {
        // API call to add new category
        // Update local state
      } catch (error) {
        console.error('Error adding category:', error);
      }
    };
  
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Service Categories</h2>
          <Button onClick={() => setIsDialogOpen(true)}>Add Category</Button>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="text-gray-600">{category.description}</p>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline">Edit</Button>
                <Button variant="destructive">Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  export default ServiceCategories;