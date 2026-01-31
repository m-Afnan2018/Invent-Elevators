import express from "express";
import {
    createClient,
    getClients
} from "../controllers/clientController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createClient);
router.get("/", protect, getClients);

export default router;
