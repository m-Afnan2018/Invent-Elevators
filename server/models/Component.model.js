/**
 * Component Model
 * ---------------
 * Represents individual lift components.
 *
 * Examples:
 * - SS Hairline Cabin
 * - Gearless Machine
 * - Center Opening Door
 *
 * Why this model is important:
 * - Core building block of a lift
 * - Used inside Product configuration
 */

import mongoose from "mongoose";

const componentSchema = new mongoose.Schema(
    {
        // Reference to Component Type (Cabin, Door, Machine, etc.)
        componentType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ComponentType",
            required: true,
        },

        // Component name
        name: {
            type: String,
            required: true,
            trim: true,
        },

        /**
         * Specifications
         * --------------
         * Dynamic object to store specs like:
         * - material
         * - capacity
         * - speed
         * - finish
         */
        specs: {
            type: Object,
            default: {},
        },

        // Optional image (for frontend display)
        image: {
            type: String,
        },

        // Optional pricing (can be used later for quotation)
        price: {
            type: Number,
            default: 0,
        },

        // Enable / Disable component
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate component names under same type
componentSchema.index(
    { componentType: 1, name: 1 },
    { unique: true }
);

const Component = mongoose.model("Component", componentSchema);

export default Component;
