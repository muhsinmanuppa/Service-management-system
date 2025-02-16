import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: "Provider", required: true },
    serviceRequest: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceRequest", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    transactionId: { type: String, unique: true },
    paymentMethod: { type: String, enum: ["card", "paypal", "upi", "bank"], required: true },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
