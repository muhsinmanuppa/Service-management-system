import Provider from "../models/Provider.js";
import User from "../models/User.js";

// Verify Service Provider
export const verifyProvider = async (req, res) => {
  try {
    const provider = await Provider.findByIdAndUpdate(req.params.id, { isVerified: true }, { new: true });
    res.status(200).json({ message: "Provider verified", provider });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Service Providers
export const getAllProviders = async (req, res) => {
  try {
    const providers = await Provider.find();
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete User (Admin Only)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    await user.deleteOne();
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};