import express from "express";
import { requestService, getRequests, updateRequestStatus, deleteRequest, createService, getServiceCategories, updateService, deleteService, getServices } from "../controllers/serviceController.js";
import { protect, providerProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Request a service (Client)
router.post("/request", protect, requestService);

// Create a new service (Provider)
router.post("/", protect, providerProtect, createService);

// Get all services (Client & Provider)
router.get("/", protect, getServices);

// Get all service requests (Client & Provider)
router.get("/requests", protect, getRequests);

// Get service categories
router.get("/categories", protect, getServiceCategories);

// Update service (Provider)
router.put("/:id", protect, providerProtect, updateService);

// Delete service (Provider)
router.delete("/:id", protect, providerProtect, deleteService);

// Update service request status (Provider)
router.put("/requests/:id", protect, providerProtect, updateRequestStatus);

// Delete a service request (Client)
router.delete("/requests/:id", protect, deleteRequest);

export default router;
