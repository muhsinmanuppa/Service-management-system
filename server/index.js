import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js"; // User authentication (Clients & Service Providers)
import providerRoutes from "./routes/providerRoutes.js"; // Service Providers
import adminRoutes from "./routes/adminRoutes.js"; // Admin functionalities
import serviceRoutes from "./routes/serviceRoutes.js"; // Service request management
import paymentRoutes from "./routes/paymentRoutes.js";



dotenv.config();

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173"
];

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

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
    dbStatus: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

export default app;