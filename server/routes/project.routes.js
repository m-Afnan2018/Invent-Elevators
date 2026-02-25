import express from "express";
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
