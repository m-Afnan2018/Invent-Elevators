import express from "express";
import {
    assignClientToProject,
    removeClientFromProject
} from "../controllers/projectClientController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, assignClientToProject);
router.delete("/:id", protect, adminOnly, removeClientFromProject);

export default router;
