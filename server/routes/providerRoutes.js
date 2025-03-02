import express from "express";
import { protect, providerProtect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  verifyProviderOTP,
  registerProvider,
  getProviders,
  updateProviderProfile,
  deleteProvider,
  getProviderProfile,
  getProviderServices,
  addService,
  updateService,
  deleteService
} from "../controllers/providerController.js";

const router = express.Router();

// Profile routes
router.put("/profile", protect, providerProtect, updateProviderProfile);
router.get("/profile", protect, providerProtect, getProviderProfile);

// Service routes with file upload
router.post("/services", protect, providerProtect, upload.single('image'), addService);
router.put("/services/:id", protect, providerProtect, upload.single('image'), updateService);
router.get("/services", protect, providerProtect, getProviderServices);
router.delete("/services/:id", protect, providerProtect, deleteService);

// Other routes
router.post("/register", registerProvider);
router.post("/verify-otp", verifyProviderOTP);
router.get("/", getProviders);
router.delete("/:id", protect, deleteProvider);

export default router;
