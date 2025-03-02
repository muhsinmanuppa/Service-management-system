const Profile = () => {
    const { user, updateProfile } = useAuth();
    const [formData, setFormData] = useState({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await updateProfile(formData);
        // Show success message
      } catch (error) {
        // Show error message
      }
    };
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        
        <Card className="max-w-2xl">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <textarea
                  className="w-full p-2 border rounded"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                />
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default Profile;

  