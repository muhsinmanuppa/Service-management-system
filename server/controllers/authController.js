import User from "../models/User.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { body, validationResult } from 'express-validator';

export const validateInput = [
  body('email').isEmail().normalizeEmail(),
  body('password').trim(),
  body('name').trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];

const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
    message: 'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters'
  };
};

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
  
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  return { accessToken, refreshToken };
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const passwordCheck = validatePassword(password);
    if (!passwordCheck.isValid) {
      return res.status(400).json({ 
        success: false, 
        message: passwordCheck.message 
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        success: false, 
        message: "User already exists" 
      });
    }

    const user = await User.create({ 
      name, 
      email, 
      password, 
      role 
    });

    const { accessToken, refreshToken } = generateTokens(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: "Registration failed"
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    if (user.isLocked()) {
      return res.status(400).json({
        success: false,
        message: "Account is temporarily locked. Please try again later."
      });
    }

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      await user.incrementLoginAttempts();
      return res.status(400).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    await user.resetLoginAttempts();

    const { accessToken, refreshToken } = generateTokens(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: "Login failed"
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        ...(user.role === "client" && { servicesRequested: user.servicesRequested || [] }),
        ...(user.role === "provider" && { 
          servicesOffered: user.servicesOffered || [], 
          verified: user.verified 
        }),
      },
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile"
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.bio = req.body.bio || user.bio;
    user.expertise = req.body.expertise || user.expertise;

    if (req.body.password) {
      const passwordCheck = validatePassword(req.body.password);
      if (!passwordCheck.isValid) {
        return res.status(400).json({ 
          success: false, 
          message: passwordCheck.message 
        });
      }
      user.password = req.body.password;
    }

    if (user.role === "provider" && req.body.servicesOffered) {
      user.servicesOffered = req.body.servicesOffered;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        bio: updatedUser.bio,
        expertise: updatedUser.expertise,
        role: updatedUser.role,
        ...(updatedUser.role === "provider" && { 
          servicesOffered: updatedUser.servicesOffered 
        }),
      },
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile"
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    
    if (!refreshToken) {
      return res.status(401).json({ 
        success: false, 
        message: "No refresh token" 
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid refresh token" 
      });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      token: accessToken
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({
      success: false,
      message: "Invalid refresh token"
    });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: "Logout failed"
    });
  }
};