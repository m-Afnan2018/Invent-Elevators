import express from "express";
import { createLead, deleteLead, getAllLeads, getLeadById, updateLead } from "../controllers/lead.controller.js";

const router = express.Router();

router.post("/", createLead);
router.get("/", getAllLeads);
router.get("/:id", getLeadById);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

export default router;
