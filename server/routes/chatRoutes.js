import express from "express";
import { initializeChat, sendMessage, getChats } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/initialize", protect, initializeChat);
router.post("/message", protect, sendMessage);
router.get("/", protect, getChats);

export default router;