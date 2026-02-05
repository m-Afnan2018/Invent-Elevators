/**
 * Product Controller
 * ------------------
 * Handles lift product (complete configuration) operations.
 *
 * A Product connects:
 * - Category
 * - SubCategory
 * - Multiple Components (by type)
 */

import Product from "../models/Product.model.js";
import Category from "../models/Category.model.js";
import SubCategory from "../models/SubCategory.model.js";
import Component from "../models/Component.model.js";

/* ---------------------------------------------------
   Create Product
--------------------------------------------------- */
export const createProduct = async (req, res) => {
    try {
        const {
            category,
            subCategory,
            name,
            description,
            capacity,
            stops,
            speed,
            components,
        } = req.body;

        // Basic validation
        if (!category || !name) {
            return res.status(400).json({
                success: false,
                message: "Category and product name are required",
            });
        }

        // Check category exists
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        // Check sub-category exists (if provided)
        if (subCategory) {
            const subCategoryExists = await SubCategory.findById(subCategory);
            if (!subCategoryExists) {
                return res.status(404).json({
                    success: false,
                    message: "Sub-category not found",
                });
            }
        }

        // Optional: Validate components exist
        if (components && components.length > 0) {
            for (const item of components) {
                const componentExists = await Component.findById(item.component);
                if (!componentExists) {
                    return res.status(404).json({
                        success: false,
                        message: "One or more components not found",
                    });
                }
            }
        }

        const product = await Product.create({
            category,
            subCategory,
            name,
            description,
            capacity,
            stops,
            speed,
            components,
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ---------------------------------------------------
   Get All Products
--------------------------------------------------- */
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ isActive: true })
            .populate("category", "name")
            .populate("subCategory", "name")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ---------------------------------------------------
   Get Single Product (Full Configuration)
--------------------------------------------------- */
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("category", "name")
            .populate("subCategory", "name")
            .populate({
                path: "components.componentType",
                select: "name",
            })
            .populate({
                path: "components.component",
                select: "name specs image price",
            });

        if (!product || !product.isActive) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ---------------------------------------------------
   Update Product
--------------------------------------------------- */
export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ---------------------------------------------------
   Soft Delete Product
--------------------------------------------------- */
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product disabled successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
