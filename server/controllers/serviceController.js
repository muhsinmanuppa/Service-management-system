import ServiceRequest from "../models/ServiceRequest.js";

// Request a Service
export const requestService = async (req, res) => {
  try {
    const serviceRequest = new ServiceRequest({ ...req.body, client: req.user.id });
    await serviceRequest.save();
    res.status(201).json({ message: "Service request submitted", serviceRequest });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Service Requests
export const getRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Service Request Status
export const updateRequestStatus = async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.status(200).json({ message: "Request status updated", serviceRequest });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const deleteRequest = async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findById(req.params.id);

    if (!serviceRequest) {
      return res.status(404).json({ success: false, message: "Service request not found" });
    }

    await serviceRequest.deleteOne();
    res.status(200).json({ success: true, message: "Service request deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};