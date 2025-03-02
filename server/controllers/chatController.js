import Chat from "../models/Chat.js";

export const initializeChat = async (req, res) => {
  try {
    const { serviceRequestId, providerId } = req.body;
    const chat = new Chat({
      participants: [req.user.id, providerId],
      serviceRequest: serviceRequestId
    });
    await chat.save();
    res.status(201).json({ success: true, chat });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { chatId, content } = req.body;
    const chat = await Chat.findById(chatId);
    
    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }

    chat.messages.push({
      sender: req.user.id,
      content,
      readBy: [req.user.id]
    });
    chat.lastMessage = Date.now();
    
    await chat.save();
    res.status(200).json({ success: true, message: "Message sent" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.user.id })
      .populate('participants', 'name')
      .populate('serviceRequest', 'service status')
      .sort({ lastMessage: -1 });
    
    res.status(200).json({ success: true, chats });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};