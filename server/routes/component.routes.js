/**
 * Component Routes
 * ----------------
 * All lift component related API endpoints.
 *
 * Base URL:
 * /api/components
 */

import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import {
  createComponent,
  getAllComponents,
  getComponentById,
  getComponentsByType,
  updateComponent,
  deleteComponent,
} from "../controllers/component.controller.js";

const router = express.Router();

// Create component
router.post("/", requireAuth, createComponent);

// Get all components
router.get("/", getAllComponents);

// Get components by component type
router.get("/by-type/:typeId", getComponentsByType);

// Get single component
router.get("/:id", getComponentById);

// Update component
router.put("/:id", requireAuth, updateComponent);

// Disable component (soft delete)
router.delete("/:id", requireAuth, deleteComponent);

export default router;
