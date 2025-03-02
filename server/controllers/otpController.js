import nodemailer from "nodemailer";
import OTP from "../models/otpModel.js"; // OTP model to store OTPs in DB
import User from "../models/User.js"; // User model to update verification status
import dotenv from 'dotenv';
dotenv.config();


// Function to generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Updated Nodemailer configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  debug: true // Enable debug logs
});

// Verify transporter connection
transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("SMTP Server is ready");
  }
});

// ✅ Send OTP to email
export const sendOTP = async (req, res) => {
  try {
   

    console.log("Received request body:", req.body); // Debug log
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Generate OTP and expiration time (5 min)
    const otp = generateOTP();
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    // Save OTP in DB (Replace any existing OTP for the user)
    await OTP.findOneAndUpdate({ email }, { otp, expiry }, { upsert: true, new: true });

    // Send OTP via Email
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Your OTP for Verification",
      text: `Your OTP code is ${otp}. It expires in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("OTP Send Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to send OTP",
      error: error.message 
    });
  }
};

// ✅ Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const otpEntry = await OTP.findOne({ email });
    if (!otpEntry) {
      return res.status(400).json({ success: false, message: "OTP not found" });
    }

    // Check if OTP is expired
    if (otpEntry.expiry < new Date()) {
      await OTP.deleteOne({ email }); // Remove expired OTP
      return res.status(400).json({ success: false, message: "OTP has expired" });
    }

    // Check if OTP matches
    if (otpEntry.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // Mark user as verified
    await User.findOneAndUpdate({ email }, { verified: true });
    await OTP.deleteOne({ email }); // Delete OTP after successful verification

    return res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP verification error:", error);
    if (!res.headersSent) {
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
};

