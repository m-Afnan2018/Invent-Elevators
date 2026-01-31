import express from "express";
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from "../controllers/category-controller.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// admin only
router.post("/", protect, adminOnly, createCategory);
router.put("/:id", protect, adminOnly, updateCategory);
router.delete("/:id", protect, adminOnly, deleteCategory);

// protected (any logged user)
router.get("/", protect, getCategories);
router.get("/:id", protect, getCategoryById);

export default router;
