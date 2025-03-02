import express from "express";
import { sendOTP, verifyOTP } from "../controllers/otpController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/send",
  [body("email").isEmail().withMessage("Valid email is required")],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
      await sendOTP(req, res);
    } catch (error) {
      console.error("Route error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error",
        error: error.message 
      });
    }
  }
);

router.post(
  "/verify",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("otp").isLength({ min: 4, max: 6 }).withMessage("OTP must be 4-6 digits"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {
      const { email, otp } = req.body;
      const result = await verifyOTP(req, res); // Pass req and res to verifyOTP
      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
);

export default router;
