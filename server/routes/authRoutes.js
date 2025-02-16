import express from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Registration
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get profile (Clients, Providers & Admin)
router.get("/profile", protect, getUserProfile);

// Update user profile
router.put("/profile", protect, updateUserProfile);

export default router;
