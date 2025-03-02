import ServiceRequest from "../models/ServiceRequest.js";
import WorkStatus from "../models/WorkStatus.js";
import Service from "../models/Service.js"; // Import Service model

// Request a Service
export const requestService = async (req, res) => {
  try {
    const serviceRequest = new ServiceRequest({ ...req.body, client: req.user.id });
    await serviceRequest.save();
    const workStatus = new WorkStatus({ serviceRequest: serviceRequest._id });
    await workStatus.save();
    res.status(201).json({ message: "Service request submitted", serviceRequest });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create a new Service
export const createService = async (req, res) => {
  try {
    const { name, category, description, price, duration } = req.body;

    // Validate required fields
    if (!name || !category || !price || !duration) {
      return res.status(400).json({ message: "Name, category, price, and duration are required" });
    }

    const service = new Service({ name, category, description, price, duration });
    await service.save();
    res.status(201).json({ message: "Service created successfully", service });
  } catch (error) {
    console.error("Create Service Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all Services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.error("Get Services Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, price, duration } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid service ID" });
    }

    // Validate required fields
    if (!name || !category || !price || !duration) {
      return res.status(400).json({ message: "Name, category, price, and duration are required" });
    }

    const service = await Service.findByIdAndUpdate(
      id,
      { name, category, description, price, duration },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service updated successfully", service });
  } catch (error) {
    console.error("Update Service Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch Service Categories
export const getServiceCategories = async (req, res) => {
  try {
    const categories = await Service.distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    console.error("Get Service Categories Error:", error);
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

// Delete Service
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    await service.deleteOne();
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Delete Service Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

