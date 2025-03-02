import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

const chatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
  serviceRequest: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceRequest", required: true },
  messages: [messageSchema],
  lastMessage: { type: Date },
  status: { type: String, enum: ["active", "archived"], default: "active" }
}, { timestamps: true });

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;