import express from "express";
import {
    createCopLopPanel,
    getCopLopByProduct,
    updateCopLopPanel,
    deleteCopLopPanel
} from "../controllers/copLopController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// admin only
router.post("/", protect, adminOnly, createCopLopPanel);
router.put("/:productId", protect, adminOnly, updateCopLopPanel);
router.delete("/:productId", protect, adminOnly, deleteCopLopPanel);

// logged-in users
router.get("/:productId", protect, getCopLopByProduct);

export default router;
