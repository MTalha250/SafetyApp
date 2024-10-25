import Template from "../models/template.js";

export const createTemplate = async (req, res) => {
  const { title, description, fields } = req.body;
  try {
    const existingTemplate = await Template.findOne({ title });

    if (existingTemplate) {
      return res.status(400).json({ message: "Template already exists" });
    }

    const template = await Template.create({
      title,
      description,
      fields,
      createdBy: req.userId,
    });
    res.status(201).json({
      message: "Template created successfully",
      template,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find()
      .populate("createdBy")
      .sort({ createdAt: -1 });
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTemplateById = async (req, res) => {
  const { id } = req.params;
  try {
    const template = await Template.findById(id).populate("createdBy");
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTemplate = async (req, res) => {
  const { id } = req.params;
  const { title, description, fields, createdBy } = req.body;
  try {
    const template = await Template.findByIdAndUpdate(
      id,
      { title, description, fields, createdBy },
      { new: true }
    ).populate("createdBy");
    res.status(200).json({
      message: "Template updated successfully",
      template,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTemplate = async (req, res) => {
  const { id } = req.params;
  try {
    await Template.findByIdAndDelete(id);
    res.status(200).json({ message: "Template deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
