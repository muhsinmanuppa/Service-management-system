import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to protect routes (General Authentication)
export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Not authorized, token failed" });
  }
};

// Middleware to allow only Service Providers
export const providerProtect = async (req, res, next) => {
  if (!req.user || req.user.role !== "provider") {
    return res.status(403).json({ success: false, message: "Access denied. Providers only" });
  }
  next();
};

// Middleware to allow only Admin
export const adminProtect = async (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Access denied. Admins only" });
  }
  next();
};
