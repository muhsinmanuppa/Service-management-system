import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js"; // User authentication (Clients & Service Providers)
import providerRoutes from "./routes/providerRoutes.js"; // Service Providers
import adminRoutes from "./routes/adminRoutes.js"; // Admin functionalities
import serviceRoutes from "./routes/serviceRoutes.js"; // Service request management
import paymentRoutes from "./routes/paymentRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import workStatusRoutes from "./routes/workStatusRoutes.js";
import otpRoutes from "./routes/otpRoutes.js"; // OTP route
import cookieParser from 'cookie-parser';



dotenv.config();

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS configuration
const allowedOrigins = [
  "http://localhost:3000" 
];
app.use(cookieParser());
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Database connection middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ 
      message: "Database connection failed",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error'
    });
  }
});

// Routes
app.use("/api/auth", authRoutes); 
app.use("/api/providers", providerRoutes); 
app.use("/api/admin", adminRoutes); 
app.use("/api/services", serviceRoutes); 
app.use("/api/payments", paymentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/work-status", workStatusRoutes);
app.use("/api/otp", otpRoutes); 

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
    dbStatus: mongoose.connection?.readyState === 1 ? "Connected" : "Disconnected"
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: Object.values(err.errors).map(e => e.message)
    });
  }

  // Cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format'
    });
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


export default app;