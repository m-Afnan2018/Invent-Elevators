import Component from "../models/Component.model.js";
import ComponentType from "../models/ComponentType.model.js";

export const createComponent = async (req, res) => {
  try {
    const { componentType } = req.body;
    if (componentType) {
      const exists = await ComponentType.findById(componentType);
      if (!exists) return res.status(404).json({ success: false, message: "Component type not found" });
    }

    const component = await Component.create(req.body);
    res.status(201).json({ success: true, message: "Component created successfully", data: component });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllComponents = async (_req, res) => {
  try {
    const components = await Component.find()
      .populate("componentType", "name")
      .populate("attributeId", "name fields")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: components });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getComponentsByType = async (req, res) => {
  try {
    const components = await Component.find({ componentType: req.params.typeId, isActive: true })
      .populate("componentType", "name")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: components });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateComponent = async (req, res) => {
  try {
    const updatedComponent = await Component.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedComponent) return res.status(404).json({ success: false, message: "Component not found" });
    res.status(200).json({ success: true, message: "Component updated successfully", data: updatedComponent });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteComponent = async (req, res) => {
  try {
    const component = await Component.findByIdAndUpdate(req.params.id, { isActive: false, status: "inactive" }, { new: true });
    if (!component) return res.status(404).json({ success: false, message: "Component not found" });
    res.status(200).json({ success: true, message: "Component disabled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
