import WorkStatus from "../models/WorkStatus.js";

export const updateWorkStatus = async (req, res) => {
  try {
    const { status, progress, currentTask, note } = req.body;
    const workStatus = await WorkStatus.findOne({ serviceRequest: req.params.serviceRequestId });

    if (!workStatus) {
      return res.status(404).json({ success: false, message: "Work status not found" });
    }

    if (status) workStatus.status = status;
    if (progress) workStatus.progress = progress;
    if (currentTask) workStatus.currentTask = currentTask;
    
    if (note) {
      workStatus.notes.push({
        content: note,
        createdBy: req.user.id
      });
    }

    await workStatus.save();
    res.status(200).json({ success: true, workStatus });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const getWorkStatus = async (req, res) => {
  try {
    const workStatus = await WorkStatus.findOne({ serviceRequest: req.params.serviceRequestId })
      .populate('notes.createdBy', 'name');
    
    if (!workStatus) {
      return res.status(404).json({ success: false, message: "Work status not found" });
    }

    res.status(200).json({ success: true, workStatus });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};