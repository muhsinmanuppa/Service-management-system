import express from "express";
import { updateWorkStatus, getWorkStatus } from "../controllers/workStatusController.js";
import { protect, providerProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/:serviceRequestId", protect, providerProtect, updateWorkStatus);
router.get("/:serviceRequestId", protect, getWorkStatus);

export default router;