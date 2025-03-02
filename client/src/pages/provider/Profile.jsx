import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, TextField, Button, Alert } from '@mui/material';

const Profile = () => {
  const { user, updateProfile, refreshProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: '',
    expertise: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Load initial data
  useEffect(() => {
    const loadUserData = async () => {
      try {
        await refreshProfile(); // Fetch fresh data
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };
    loadUserData();
  }, []);

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      console.log('Setting form data from user:', user);
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        bio: user.bio || '',
        expertise: Array.isArray(user.expertise) ? user.expertise : [],
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    try {
      setIsSubmitting(true);
      const updatedUser = await updateProfile(formData);
      console.log('Profile updated:', updatedUser);
      
      // Refresh profile data after update
      await refreshProfile();
      
      setMessage({ 
        type: 'success', 
        text: 'Profile updated successfully!' 
      });
    } catch (error) {
      console.error('Update failed:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to update profile' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExpertiseChange = (e) => {
    const expertiseValue = e.target.value;
    setFormData(prev => ({
      ...prev,
      expertise: expertiseValue.split(',').map(item => item.trim())
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Provider Profile</h1>
      
      <Card className="max-w-2xl">
        <CardContent>
          {message.text && (
            <Alert severity={message.type} className="mb-4">
              {message.text}
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <TextField
                fullWidth
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <TextField
                fullWidth
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Expertise</label>
              <TextField
                fullWidth
                value={Array.isArray(formData.expertise) ? formData.expertise.join(', ') : formData.expertise}
                onChange={handleExpertiseChange}
                placeholder="Enter expertise separated by commas"
                disabled={isSubmitting}
              />
            </div>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;

