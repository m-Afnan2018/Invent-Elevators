import express from "express";
import { dashboardAccess, forgotPassword, login, logout, me, resetPassword, signup } from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", me);
router.get("/dashboard-access", requireAuth, dashboardAccess);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/logout", logout);

export default router;
