import Provider from "../models/Provider.js";

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

// Update Provider Profile
export const updateProviderProfile = async (req, res) => {
  try {
    const provider = await Provider.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.status(200).json({ message: "Profile updated", provider });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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