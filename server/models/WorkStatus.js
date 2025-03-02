import mongoose from "mongoose";

const workStatusSchema = new mongoose.Schema({
  serviceRequest: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceRequest", required: true },
  status: { type: String, enum: ["not-started", "in-progress", "review", "completed"], default: "not-started" },
  progress: { type: Number, min: 0, max: 100, default: 0 },
  currentTask: { type: String },
  notes: [{ 
    content: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const WorkStatus = mongoose.model("WorkStatus", workStatusSchema);
export default WorkStatus;