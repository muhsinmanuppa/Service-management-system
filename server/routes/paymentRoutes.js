import express from "express";
import { processPayment, getPaymentHistory, generateInvoice, refundPayment } from "../controllers/paymentController.js";
import { protect, adminProtect } from "../middleware/authMiddleware.js"; // Middleware for authentication

const router = express.Router();

// Route to process a payment
router.post("/pay", protect, processPayment);

// Route to fetch payment history for a user
router.get("/history", protect, getPaymentHistory);

// Route to generate an invoice for a specific transaction
router.get("/invoice/:id", protect, generateInvoice);

// Route to handle refunds (only admin can process refunds)
router.post("/refund/:id", protect, adminProtect, refundPayment);

export default router;
