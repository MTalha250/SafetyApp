import Assessment from "../models/assessment.js";

export const createAssessment = async (req, res) => {
  const { client, template, data, status, flaggedItems, media } = req.body;
  try {
    const assessment = await Assessment.create({
      client,
      assignedTo: req.userId,
      template,
      data,
      status,
      flaggedItems,
      media,
    });
    res.status(201).json({
      message: "Assessment created successfully",
      assessment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find().sort({ createdAt: -1 });
    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAssessmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const assessment = await Assessment.findById(id);
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }
    res.status(200).json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAssessmentsByClient = async (req, res) => {
  try {
    const assessments = await Assessment.find({ client: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAssessmentsByUser = async (req, res) => {
  try {
    const assessments = await Assessment.find({ assignedTo: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAssessment = async (req, res) => {
  const { id } = req.params;
  const { client, template, data, status, flaggedItems, media } = req.body;
  try {
    const assessment = await Assessment.findByIdAndUpdate(
      id,
      { client, template, data, status, flaggedItems, media },
      { new: true }
    );
    res.status(200).json({
      message: "Assessment updated successfully",
      assessment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAssessment = async (req, res) => {
  const { id } = req.params;
  try {
    await Assessment.findByIdAndDelete(id);
    res.status(200).json({ message: "Assessment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
