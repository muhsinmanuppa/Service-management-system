import express from "express";
import { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile, 
  logout, 
  validateInput
} from "../controllers/authController.js";
import { protect, providerProtect, clientProtect } from "../middleware/authMiddleware.js";
import { sendOTP, verifyOTP } from "../controllers/otpController.js";

const router = express.Router();

// Registration
router.post("/register", validateInput, registerUser);


router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
// Login
router.post("/login", validateInput, loginUser);

// Logout
router.post("/logout", logout);

// Get profile (Clients, Providers & Admin)
router.get("/profile", protect, getUserProfile);

// /api/auth/me
router.get("/me", protect, getUserProfile);

// Update user profile
router.put("/profile", protect, updateUserProfile);

// Update provider profile
router.put("/provider/profile", protect, providerProtect, updateUserProfile);

// Update client profile
router.put("/client/profile", protect, clientProtect, updateUserProfile);

export default router;
