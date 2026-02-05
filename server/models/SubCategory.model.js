/**
 * SubCategory Model
 * -----------------
 * Represents lift sub-categories under a main category.
 *
 * Example:
 * Category: Passenger Lift
 * SubCategory: MRL Lift
 *
 * Why needed:
 * - Keeps lift types structured
 * - Allows products to be grouped correctly
 */

import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
    {
        // Reference to parent Category
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        // Sub-category name
        name: {
            type: String,
            required: true,
            trim: true,
        },

        // Optional description
        description: {
            type: String,
            trim: true,
        },

        // Enable / Disable without deleting
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate sub-categories under same category
subCategorySchema.index(
    { category: 1, name: 1 },
    { unique: true }
);

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;
