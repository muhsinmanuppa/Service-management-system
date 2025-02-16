import express from "express";
import { requestService, getRequests, updateRequestStatus, deleteRequest } from "../controllers/serviceController.js";
import { protect, providerProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Request a service (Client)
router.post("/request", protect, requestService);

// Get all service requests (Client & Provider)
router.get("/", protect, getRequests);

// Update service request status (Provider)
router.put("/:id", protect, providerProtect, updateRequestStatus);

// Delete a service request (Client)
router.delete("/:id", protect, deleteRequest);

export default router;
