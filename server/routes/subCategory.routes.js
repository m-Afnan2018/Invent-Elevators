/**
 * SubCategory Routes
 * ------------------
 * All sub-category related API endpoints.
 *
 * Base URL:
 * /api/sub-categories
 */

import express from "express";
import {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  getSubCategoriesByCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../controllers/subCategory.controller.js";

const router = express.Router();

// Create sub-category
router.post("/", createSubCategory);

// Get all sub-categories
router.get("/", getAllSubCategories);

// Get sub-categories by category
router.get("/by-category/:categoryId", getSubCategoriesByCategory);

// Get single sub-category
router.get("/:id", getSubCategoryById);

// Update sub-category
router.put("/:id", updateSubCategory);

// Disable sub-category (soft delete)
router.delete("/:id", deleteSubCategory);

export default router;
