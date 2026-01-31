import express from "express";
import {
    createProject,
    getProjects,
    getProjectById,
    deleteProject
} from "../controllers/projectController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createProject);
router.get("/", protect, getProjects);
router.get("/:id", protect, getProjectById);
router.delete("/:id", protect, adminOnly, deleteProject);

export default router;
