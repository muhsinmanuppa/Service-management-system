import Payment from "../models/Payment.js";

// Create Payment
export const createPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json({ message: "Payment successful", payment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Payment History
export const getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.id });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Generate Invoice
export const generateInvoice = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    res.status(200).json({ message: "Invoice generated", payment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Process Payment
export const processPayment = async (req, res) => {
  try {
    const { client, provider, serviceRequest, amount, paymentMethod, transactionId } = req.body;

    if (!client || !provider || !serviceRequest || !amount || !paymentMethod) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const payment = new Payment({
      client,
      provider,
      serviceRequest,
      amount,
      status: "pending",
      transactionId,
      paymentMethod,
    });

    await payment.save();
    res.status(201).json({ success: true, message: "Payment processed successfully", payment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Refund Payment
export const refundPayment = async (req, res) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ success: false, message: "Payment ID is required" });
    }

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    if (payment.status !== "completed") {
      return res.status(400).json({ success: false, message: "Only completed payments can be refunded" });
    }

    // Mark as refunded (you might need to integrate an actual refund process with a payment provider)
    payment.status = "refunded";
    await payment.save();

    res.status(200).json({ success: true, message: "Payment refunded successfully", payment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};