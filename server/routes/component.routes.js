/**
 * Component Routes
 * ----------------
 * All lift component related API endpoints.
 *
 * Base URL:
 * /api/components
 */

import express from "express";
import {
    createComponent,
    getAllComponents,
    getComponentsByType,
    updateComponent,
    deleteComponent,
} from "../controllers/component.controller.js";

const router = express.Router();

/* ---------------------------------------------------
   Component Routes
--------------------------------------------------- */

// Create component
router.post("/", createComponent);

// Get all components
router.get("/", getAllComponents);

// Get components by component type
router.get("/by-type/:typeId", getComponentsByType);

// Update component
router.put("/:id", updateComponent);

// Disable component (soft delete)
router.delete("/:id", deleteComponent);

export default router;
