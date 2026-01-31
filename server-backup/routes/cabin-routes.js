import express from "express";
import {
    createCabin,
    getCabinByProduct,
    updateCabin,
    deleteCabin
} from "../controllers/cabinController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// admin only
router.post("/", protect, adminOnly, createCabin);
router.put("/:productId", protect, adminOnly, updateCabin);
router.delete("/:productId", protect, adminOnly, deleteCabin);

// logged-in users
router.get("/:productId", protect, getCabinByProduct);

export default router;
