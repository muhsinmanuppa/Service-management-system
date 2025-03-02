// models/User.js
import mongoose from "mongoose";
import argon2 from "argon2";

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      enum: ["client", "provider", "admin"], 
      default: "client" 
    },
    phone: { 
      type: String,
      trim: true 
    },
    address: { 
      type: String,
      trim: true 
    },
    verified: { 
      type: Boolean, 
      default: false 
    },
    emailVerificationOTP: { 
      type: String, 
      default: null 
    },
    otpExpiry: { 
      type: Date, 
      default: null 
    },
    profileImage: { 
      type: String, 
      default: null 
    },
    bio: { 
      type: String, 
      trim: true 
    },
    expertise: [{ 
      type: String, 
      trim: true 
    }],
    servicesOffered: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    }],
    servicesRequested: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    }],
    rating: { 
      type: Number, 
      default: 0 
    },
    reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }],
    lastLogin: {
      type: Date
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    failedLoginAttempts: {
      type: Number,
      default: 0
    },
    accountLocked: {
      type: Boolean,
      default: false
    },
    lockUntil: Date
  },
  { 
    timestamps: true 
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  try {
    this.password = await argon2.hash(this.password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1
    });
    next();
  } catch (err) {
    next(err);
  }
});

// Check if account is locked
userSchema.methods.isLocked = function() {
  return this.accountLocked && this.lockUntil && this.lockUntil > Date.now();
};

// Increment failed login attempts
userSchema.methods.incrementLoginAttempts = async function() {
  this.failedLoginAttempts += 1;
  
  if (this.failedLoginAttempts >= 5) {
    this.accountLocked = true;
    this.lockUntil = Date.now() + 15 * 60 * 1000; // Lock for 15 minutes
  }
  
  await this.save();
};

// Reset failed login attempts
userSchema.methods.resetLoginAttempts = async function() {
  this.failedLoginAttempts = 0;
  this.accountLocked = false;
  this.lockUntil = null;
  await this.save();
};

const User = mongoose.model("User", userSchema);
export default User;
