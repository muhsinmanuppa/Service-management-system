import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    services: [{ type: String, required: true }], // List of services offered
    location: { type: String, required: true },
    availability: { type: Boolean, default: true },
    documents: [{ type: String }], // Store file paths of verification documents
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Provider = mongoose.model("Provider", providerSchema);
export default Provider;
