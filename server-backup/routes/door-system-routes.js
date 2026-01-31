import express from "express";
import {
    createDoorSystem,
    getDoorSystemByProduct,
    updateDoorSystem,
    deleteDoorSystem
} from "../controllers/doorSystemController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// admin only
router.post("/", protect, adminOnly, createDoorSystem);
router.put("/:productId", protect, adminOnly, updateDoorSystem);
router.delete("/:productId", protect, adminOnly, deleteDoorSystem);

// logged-in users
router.get("/:productId", protect, getDoorSystemByProduct);

export default router;
