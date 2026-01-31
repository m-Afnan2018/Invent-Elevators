import express from "express";
import {
    createInquiry,
    getInquiries,
    getInquiryById,
    updateInquiry,
    deleteInquiry
} from "../controllers/inquiryController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC (website form)
router.post("/", createInquiry);

// ADMIN
router.get("/", protect, adminOnly, getInquiries);
router.get("/:id", protect, adminOnly, getInquiryById);
router.put("/:id", protect, adminOnly, updateInquiry);
router.delete("/:id", protect, adminOnly, deleteInquiry);

export default router;
