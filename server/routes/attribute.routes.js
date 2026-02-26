import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { createAttribute, deleteAttribute, getAllAttributes, getAttributeById, updateAttribute } from "../controllers/attribute.controller.js";

const router = express.Router();

router.post("/", requireAuth, createAttribute);
router.get("/", getAllAttributes);
router.get("/:id", getAttributeById);
router.put("/:id", requireAuth, updateAttribute);
router.delete("/:id", requireAuth, deleteAttribute);

export default router;
