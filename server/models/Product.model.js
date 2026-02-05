/**
 * Product Model
 * -------------
 * Represents a complete lift (elevator) configuration.
 *
 * Example:
 * - 6 Passenger MRL Lift
 *   - Cabin: SS Hairline
 *   - Door: Center Opening
 *   - Machine: Gearless
 *   - Controller: VVVF
 *
 * Why this model is powerful:
 * - Fully dynamic configuration
 * - Scales with business growth
 */

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        // Main Category (Passenger, Goods, Hospital, etc.)
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        // Sub Category (MRL, Machine Room, Hydraulic, etc.)
        subCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory",
        },

        // Product name
        name: {
            type: String,
            required: true,
            trim: true,
        },

        // Short description for frontend
        description: {
            type: String,
            trim: true,
        },

        // Lift capacity (e.g., 6 Passenger, 450 KG)
        capacity: {
            type: String,
        },

        // Number of stops / floors
        stops: {
            type: Number,
        },

        // Lift speed (e.g., 1 m/s, 1.5 m/s)
        speed: {
            type: String,
        },

        /**
         * Components used in this product
         * --------------------------------
         * Grouped by component type
         */
        components: [
            {
                componentType: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "ComponentType",
                    required: true,
                },
                component: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Component",
                    required: true,
                },
            },
        ],

        // Enable / Disable product
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate product names under same category
productSchema.index(
    { category: 1, name: 1 },
    { unique: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
