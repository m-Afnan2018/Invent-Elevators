/**
 * Category Routes
 * ---------------
 * All category related API endpoints.
 *
 * Base URL:
 * /api/categories
 */

import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

/* ---------------------------------------------------
   Category Routes
--------------------------------------------------- */

// Create category
router.post("/", requireAuth, createCategory);

// Get all categories
router.get("/", getAllCategories);

// Get single category
router.get("/:id", getCategoryById);

// Update category
router.put("/:id", requireAuth, updateCategory);

// Disable category (soft delete)
router.delete("/:id", requireAuth, deleteCategory);

export default router;
