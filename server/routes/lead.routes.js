import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { createLead, deleteLead, getAllLeads, getLeadById, updateLead } from "../controllers/lead.controller.js";

const router = express.Router();

router.post("/", createLead);
router.get("/", requireAuth, getAllLeads);
router.get("/:id", requireAuth, getLeadById);
router.put("/:id", requireAuth, updateLead);
router.delete("/:id", requireAuth, deleteLead);

export default router;
