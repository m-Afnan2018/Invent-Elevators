/**
 * ComponentType Routes
 * --------------------
 * All component type related API endpoints.
 *
 * Base URL:
 * /api/component-types
 */

import express from "express";
import {
    createComponentType,
    getAllComponentTypes,
    updateComponentType,
    deleteComponentType,
} from "../controllers/componentType.controller.js";

const router = express.Router();

/* ---------------------------------------------------
   Component Type Routes
--------------------------------------------------- */

// Create component type
router.post("/", createComponentType);

// Get all component types
router.get("/", getAllComponentTypes);

// Update component type
router.put("/:id", updateComponentType);

// Disable component type (soft delete)
router.delete("/:id", deleteComponentType);

export default router;
