import Provider from "../models/Provider.js";
import Service from "../models/Service.js";
import User from "../models/User.js";

// verifyProviderOTP
export const verifyProviderOTP = async (req, res) => {
  try {
    const { providerId, otp } = req.body;

    // Check if provider exists
    const provider = await Provider.findById(providerId).populate('user');
    if (!provider) {
      return res.status(404).json({ success: false, message: "Provider not found" });
    }

    // Check if OTP is valid
    if (!provider.emailVerificationOTP || provider.emailVerificationOTP !== otp) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    // Update Provider model
    provider.isEmailVerified = true;
    provider.emailVerificationOTP = null;
    await provider.save();

    // Update associated User model if exists
    if (provider.user) {
      provider.user.verified = true;
      await provider.user.save();
    }

    res.status(200).json({ 
      success: true,
      message: "Email verified successfully!",
      isEmailVerified: true 
    });

  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Register Service Provider
export const registerProvider = async (req, res) => {
  try {
    const provider = new Provider(req.body);
    await provider.save();
    res.status(201).json({ message: "Provider registered successfully", provider });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Verified Providers
export const getProviders = async (req, res) => {
  try {
    const providers = await Provider.find({ isVerified: true });
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateProviderProfile = async (req, res) => {
  try {
    // Find both user and provider documents
    const user = await User.findById(req.user.id);
    const provider = await Provider.findOne({ user: req.user.id });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Update user fields
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.bio = req.body.bio || user.bio;
    user.expertise = req.body.expertise || user.expertise;

    // Save user changes
    await user.save();

    // Update provider fields if provider exists
    if (provider) {
      provider.services = req.body.expertise || provider.services;
      await provider.save();
    }

    // Return updated user data
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        bio: user.bio,
        expertise: user.expertise,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile"
    });
  }
};

export const getProviderProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const provider = await Provider.findOne({ user: req.user.id });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "Provider not found" 
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        bio: user.bio,
        expertise: user.expertise,
        role: user.role,
        services: provider ? provider.services : []
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile"
    });
  }
};

// Delete Provider
export const deleteProvider = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) return res.status(404).json({ success: false, message: "Provider not found" });

    await provider.deleteOne();
    res.status(200).json({ success: true, message: "Provider deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const getProviderServices = async (req, res) => {
  try {
    console.log('Fetching services for provider:', req.user.id);
    const services = await Service.find({ provider: req.user.id });
    console.log('Found services:', services);
    res.json({ 
      success: true, 
      services,
      message: 'Services fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch services',
      error: error.message 
    });
  }
};

export const addService = async (req, res) => {
  try {
    console.log('Adding service:', req.body);
    const { name, description, price, duration, category } = req.body;
    
    const service = new Service({
      name,
      description,
      price: Number(price),
      duration: Number(duration),
      category,
      provider: req.user.id
    });

    const savedService = await service.save();
    console.log('Service saved:', savedService);

    res.status(201).json({ 
      success: true, 
      service: savedService,
      message: 'Service added successfully'
    });
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to add service',
      error: error.message 
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Updating service:', id, req.body);

    const service = await Service.findOne({ _id: id, provider: req.user.id });
    if (!service) {
      return res.status(404).json({ 
        success: false, 
        message: "Service not found" 
      });
    }

    const updates = {
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      duration: Number(req.body.duration),
      category: req.body.category
    };

    const updatedService = await Service.findByIdAndUpdate(
      id, 
      updates, 
      { new: true, runValidators: true }
    );

    console.log('Service updated:', updatedService);
    res.json({ 
      success: true, 
      service: updatedService,
      message: 'Service updated successfully'
    });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update service',
      error: error.message 
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findOne({ _id: id, provider: req.user.id });
    
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    await service.deleteOne();
    res.json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};