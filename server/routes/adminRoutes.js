import express from "express";
import { verifyProvider, getAllUsers, deleteUser, getAllProviders } from "../controllers/adminController.js";
import { protect, adminProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Verify a service provider
router.put("/verify-provider/:id", protect, adminProtect, verifyProvider);

// Get all users (clients)
router.get("/users", protect, adminProtect, getAllUsers);

// Get all service providers
router.get("/providers", protect, adminProtect, getAllProviders);

// Delete a user or provider
router.delete("/user/:id", protect, adminProtect, deleteUser);

export default router;
