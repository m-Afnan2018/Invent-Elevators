import express from "express";
import {
    addProductImage,
    getProductImages,
    setPrimaryImage,
    deleteProductImage
} from "../controllers/productImageController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// admin only
router.post("/", protect, adminOnly, addProductImage);
router.put("/:id/primary", protect, adminOnly, setPrimaryImage);
router.delete("/:id", protect, adminOnly, deleteProductImage);

// logged-in users
router.get("/:productId", protect, getProductImages);

export default router;
