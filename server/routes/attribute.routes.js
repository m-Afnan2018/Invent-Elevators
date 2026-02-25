import express from "express";
import { createAttribute, deleteAttribute, getAllAttributes, getAttributeById, updateAttribute } from "../controllers/attribute.controller.js";

const router = express.Router();

router.post("/", createAttribute);
router.get("/", getAllAttributes);
router.get("/:id", getAttributeById);
router.put("/:id", updateAttribute);
router.delete("/:id", deleteAttribute);

export default router;
