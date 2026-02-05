/**
 * Product Routes
 * --------------
 * All lift product related API endpoints.
 *
 * Base URL:
 * /api/products
 */

import express from "express";
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

/* ---------------------------------------------------
   Product Routes
--------------------------------------------------- */

// Create product (lift configuration)
router.post("/", createProduct);

// Get all products
router.get("/", getAllProducts);

// Get single product with full configuration
router.get("/:id", getProductById);

// Update product
router.put("/:id", updateProduct);

// Disable product (soft delete)
router.delete("/:id", deleteProduct);

export default router;
