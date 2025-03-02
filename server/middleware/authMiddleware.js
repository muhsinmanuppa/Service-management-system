import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Error handler middleware
export const errorHandler = (error, req, res, next) => {
  console.error({
    timestamp: new Date().toISOString(),
    error: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
  });

  return res.status(500).json({
    success: false,
    message: "An unexpected error occurred",
  });
};

// Protect Routes (All Users)
export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }

    token = token.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      if (user.isLocked && user.isLocked()) {
        return res.status(401).json({
          success: false,
          message: "Account is temporarily locked. Please try again later.",
        });
      }

      req.user = user;
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token expired",
        });
      }
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

// Protect Provider Routes
export const providerProtect = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "provider") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Providers only",
      });
    }

    // Allow dashboard access for unverified providers but restrict services
    if (!req.user.verified) {
      if (req.path.includes("/dashboard")) {
        return next(); // Allow access to dashboard
      } else {
        return res.status(403).json({
          success: false,
          message: "Account not verified. Please complete verification process.",
        });
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

// Protect Admin Routes
export const adminProtect = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

// Protect Client Routes
export const clientProtect = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "client") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Clients only",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
