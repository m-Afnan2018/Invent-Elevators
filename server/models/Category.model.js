/**
 * Category Model
 * --------------
 * This schema represents main lift categories.
 *
 * Examples:
 * - Passenger Lift
 * - Goods Lift
 * - Hospital Lift
 *
 * Why this model is important:
 * - Acts as the root for sub-categories and products
 * - Keeps lift types well organized
 */

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        // Category name (must be unique)
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        // Short description for admin / frontend
        description: {
            type: String,
            trim: true,
        },

        // Optional image (banner / icon)
        image: {
            type: String,
        },

        // Enable / Disable category without deleting
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true, // adds createdAt & updatedAt
    }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
