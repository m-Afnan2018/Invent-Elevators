/**
 * ComponentType Model
 * -------------------
 * Represents different types of lift components.
 *
 * Examples:
 * - Cabin
 * - Door
 * - Machine
 * - Controller
 *
 * Why this is needed:
 * - Groups similar components
 * - Makes product configuration dynamic
 */

import mongoose from "mongoose";

const componentTypeSchema = new mongoose.Schema(
    {
        // Type name (unique)
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        // Short description for admin clarity
        description: {
            type: String,
            trim: true,
        },

        // Optional ordering for UI (Cabin first, Door second, etc.)
        order: {
            type: Number,
            default: 0,
        },

        // Enable / Disable type
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const ComponentType = mongoose.model(
    "ComponentType",
    componentTypeSchema
);

export default ComponentType;
