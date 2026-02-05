/**
 * Component Controller
 * --------------------
 * Handles lift component operations.
 *
 * Components are the real building blocks of a lift.
 */

import Component from "../models/Component.model.js";
import ComponentType from "../models/ComponentType.model.js";

/* ---------------------------------------------------
   Create Component
--------------------------------------------------- */
export const createComponent = async (req, res) => {
    try {
        const { componentType, name, specs, image, price } = req.body;

        // Basic validation
        if (!componentType || !name) {
            return res.status(400).json({
                success: false,
                message: "Component type and name are required",
            });
        }

        // Check component type exists
        const typeExists = await ComponentType.findById(componentType);
        if (!typeExists) {
            return res.status(404).json({
                success: false,
                message: "Component type not found",
            });
        }

        const component = await Component.create({
            componentType,
            name,
            specs,
            image,
            price,
        });

        res.status(201).json({
            success: true,
            message: "Component created successfully",
            data: component,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ---------------------------------------------------
   Get All Components
--------------------------------------------------- */
export const getAllComponents = async (req, res) => {
    try {
        const components = await Component.find()
            .populate("componentType", "name")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: components,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ---------------------------------------------------
   Get Components By Type
--------------------------------------------------- */
export const getComponentsByType = async (req, res) => {
    try {
        const { typeId } = req.params;

        const components = await Component.find({
            componentType: typeId,
            isActive: true,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: components,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ---------------------------------------------------
   Update Component
--------------------------------------------------- */
export const updateComponent = async (req, res) => {
    try {
        const updatedComponent = await Component.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedComponent) {
            return res.status(404).json({
                success: false,
                message: "Component not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Component updated successfully",
            data: updatedComponent,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ---------------------------------------------------
   Soft Delete Component
--------------------------------------------------- */
export const deleteComponent = async (req, res) => {
    try {
        const component = await Component.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!component) {
            return res.status(404).json({
                success: false,
                message: "Component not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Component disabled successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
