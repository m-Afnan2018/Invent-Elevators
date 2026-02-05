/**
 * SubCategory Controller
 * ----------------------
 * Handles all sub-category related operations.
 *
 * SubCategory always belongs to a Category.
 */

import SubCategory from "../models/SubCategory.model.js";
import Category from "../models/Category.model.js";

/* ---------------------------------------------------
   Create Sub Category
--------------------------------------------------- */
export const createSubCategory = async (req, res) => {
    try {
        const { category, name, description } = req.body;

        // Basic validation
        if (!category || !name) {
            return res.status(400).json({
                success: false,
                message: "Category and sub-category name are required",
            });
        }

        // Check if parent category exists
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(404).json({
                success: false,
                message: "Parent category not found",
            });
        }

        const subCategory = await SubCategory.create({
            category,
            name,
            description,
        });

        res.status(201).json({
            success: true,
            message: "Sub-category created successfully",
            data: subCategory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ---------------------------------------------------
   Get All Sub Categories
--------------------------------------------------- */
export const getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find()
            .populate("category", "name")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: subCategories,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ---------------------------------------------------
   Get Sub Categories By Category
--------------------------------------------------- */
export const getSubCategoriesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const subCategories = await SubCategory.find({
            category: categoryId,
            isActive: true,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: subCategories,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ---------------------------------------------------
   Update Sub Category
--------------------------------------------------- */
export const updateSubCategory = async (req, res) => {
    try {
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedSubCategory) {
            return res.status(404).json({
                success: false,
                message: "Sub-category not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Sub-category updated successfully",
            data: updatedSubCategory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ---------------------------------------------------
   Soft Delete Sub Category (Disable)
--------------------------------------------------- */
export const deleteSubCategory = async (req, res) => {
    try {
        const subCategory = await SubCategory.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!subCategory) {
            return res.status(404).json({
                success: false,
                message: "Sub-category not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Sub-category disabled successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
