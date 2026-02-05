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
    getSubCategoriesByCategory,
    updateSubCategory,
    deleteSubCategory,
} from "../controllers/subCategory.controller.js";

const router = express.Router();

/* ---------------------------------------------------
   Sub Category Routes
--------------------------------------------------- */

// Create sub-category
router.post("/", createSubCategory);

// Get all sub-categories
router.get("/", getAllSubCategories);

// Get sub-categories by category
router.get(
    "/by-category/:categoryId",
    getSubCategoriesByCategory
);

// Update sub-category
router.put("/:id", updateSubCategory);

// Disable sub-category (soft delete)
router.delete("/:id", deleteSubCategory);

export default router;
