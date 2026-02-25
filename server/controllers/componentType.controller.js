/**
 * ComponentType Controller
 * ------------------------
 * Handles component type operations.
 */

import ComponentType from "../models/ComponentType.model.js";

export const createComponentType = async (req, res) => {
  try {
    const { name, description, order } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Component type name is required",
      });
    }

    const componentType = await ComponentType.create({
      name,
      description,
      order,
    });

    res.status(201).json({
      success: true,
      message: "Component type created successfully",
      data: componentType,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllComponentTypes = async (_req, res) => {
  try {
    const componentTypes = await ComponentType.find().sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      data: componentTypes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getComponentTypeById = async (req, res) => {
  try {
    const componentType = await ComponentType.findById(req.params.id);

    if (!componentType) {
      return res.status(404).json({
        success: false,
        message: "Component type not found",
      });
    }

    res.status(200).json({
      success: true,
      data: componentType,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateComponentType = async (req, res) => {
  try {
    const updatedType = await ComponentType.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!updatedType) {
      return res.status(404).json({
        success: false,
        message: "Component type not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Component type updated successfully",
      data: updatedType,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteComponentType = async (req, res) => {
  try {
    const componentType = await ComponentType.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });

    if (!componentType) {
      return res.status(404).json({
        success: false,
        message: "Component type not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Component type disabled successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
