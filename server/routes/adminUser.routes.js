import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { createAdminUser, deleteAdminUser, getAdminUserById, getAllAdminUsers, updateAdminUser } from "../controllers/adminUser.controller.js";

const router = express.Router();

router.use(requireAuth);

router.post("/", createAdminUser);
router.get("/", getAllAdminUsers);
router.get("/:id", getAdminUserById);
router.put("/:id", updateAdminUser);
router.delete("/:id", deleteAdminUser);

export default router;
