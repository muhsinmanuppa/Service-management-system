import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    services: [{ type: String, required: true }], // List of services offered
    location: { type: String, required: true },
    availability: { type: Boolean, default: true },
    documents: [{ type: String }], // Store file paths of verification documents
    approved: { type: Boolean, default: false }, // Admin approval
    isEmailVerified: { type: Boolean, default: false }, // Email verification status
    verificationToken: { type: String }, // Token for email verification
    emailVerificationOTP: { type: String },
  },
  { timestamps: true }
);

const Provider = mongoose.model("Provider", providerSchema);
export default Provider;
