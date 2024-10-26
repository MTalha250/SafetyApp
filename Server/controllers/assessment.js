import Assessment from "../models/assessment.js";
import Template from "../models/template.js";

export const validateAndCreateAssessment = async (req, res) => {
  const { client, assignedTo, template, data, status, flaggedItems, media } =
    req.body;
  try {
    const existingTemplate = await Template.findById(template);
    if (!existingTemplate) {
      return res.status(404).json({ message: "Template not found" });
    }
    existingTemplate.fields.forEach((field) => {
      if (field.required && !data[field.label]) {
        return res.status(400).json({ message: `${field.label} is required` });
      }
    });
    const assessment = await Assessment.create({
      client,
      assignedTo,
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
    const assessments = await Assessment.find()
      .populate("client assignedTo template")
      .sort({
        createdAt: -1,
      });
    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAssessmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const assessment = await Assessment.findById(id).populate(
      "client assignedTo template"
    );
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
    const assessments = await Assessment.find({ client: req.userId })
      .populate("client assignedTo template")
      .sort({
        createdAt: -1,
      });
    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAssessmentsByUser = async (req, res) => {
  try {
    const assessments = await Assessment.find({ assignedTo: req.userId })
      .populate("client assignedTo template")
      .sort({
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
    ).populate("client assignedTo template");
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
