import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from "../controllers/blog.controller.js";

const router = express.Router();

router.post("/", requireAuth, createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.put("/:id", requireAuth, updateBlog);
router.delete("/:id", requireAuth, deleteBlog);

export default router;
