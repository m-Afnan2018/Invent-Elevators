import express from "express";
import {
    addSpecification,
    getSpecificationsByProduct,
    updateSpecification,
    deleteSpecification
} from "../controllers/productSpecificationController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// admin only
router.post("/", protect, adminOnly, addSpecification);
router.put("/:id", protect, adminOnly, updateSpecification);
router.delete("/:id", protect, adminOnly, deleteSpecification);

// logged-in users
router.get("/product/:productId", protect, getSpecificationsByProduct);

export default router;
