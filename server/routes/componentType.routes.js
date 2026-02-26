/**
 * ComponentType Routes
 * --------------------
 * All component type related API endpoints.
 *
 * Base URL:
 * /api/component-types
 */

import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import {
  createComponentType,
  getAllComponentTypes,
  getComponentTypeById,
  updateComponentType,
  deleteComponentType,
} from "../controllers/componentType.controller.js";

const router = express.Router();

// Create component type
router.post("/", requireAuth, createComponentType);

// Get all component types
router.get("/", getAllComponentTypes);

// Get single component type
router.get("/:id", getComponentTypeById);

// Update component type
router.put("/:id", requireAuth, updateComponentType);

// Disable component type (soft delete)
router.delete("/:id", requireAuth, deleteComponentType);

export default router;
