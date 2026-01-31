import express from "express";
import {
    createElevatorMachine,
    getMachineByProduct,
    updateElevatorMachine,
    deleteElevatorMachine
} from "../controllers/elevatorMachineController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// admin only
router.post("/", protect, adminOnly, createElevatorMachine);
router.put("/:productId", protect, adminOnly, updateElevatorMachine);
router.delete("/:productId", protect, adminOnly, deleteElevatorMachine);

// logged-in users
router.get("/:productId", protect, getMachineByProduct);

export default router;
