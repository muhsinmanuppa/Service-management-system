import express from "express";
import { registerProvider, getProviders, updateProviderProfile, deleteProvider } from "../controllers/providerController.js";
import { protect, providerProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register a new service provider
router.post("/register", registerProvider);

// Get all verified service providers
router.get("/", getProviders);

// Update provider profile
router.put("/profile", protect, providerProtect, updateProviderProfile);

// Delete a provider (Admin only)
router.delete("/:id", protect, deleteProvider);

export default router;
