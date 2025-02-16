import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: "Provider" },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    status: { type: String, enum: ["pending", "accepted", "completed", "canceled"], default: "pending" },
    scheduledAt: { type: Date },
    completedAt: { type: Date },
    feedback: { type: String },
    rating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

const ServiceRequest = mongoose.model("ServiceRequest", serviceRequestSchema);
export default ServiceRequest;
