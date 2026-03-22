/**
 * Server Entry + App Setup (Merged)
 */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import path from "path";

import categoryRoutes from "./routes/category.routes.js";
import subCategoryRoutes from "./routes/subCategory.routes.js";
import componentTypeRoutes from "./routes/componentType.routes.js";
import componentRoutes from "./routes/component.routes.js";
import productRoutes from "./routes/product.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import attributeRoutes from "./routes/attribute.routes.js";
import projectRoutes from "./routes/project.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import leadRoutes from "./routes/lead.routes.js";
import adminUserRoutes from "./routes/adminUser.routes.js";
import authRoutes from "./routes/auth.routes.js";
import connectDB from "./configs/db.js";
import API_ROUTES from "./apis.js";

dotenv.config();

const app = express();
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

connectDB();
app.disable("x-powered-by");
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS origin not allowed"));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));
app.use(cookieParser());

// Serve uploaded images statically
app.use("/uploads", express.static(path.resolve("uploads")));

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Lift Backend API is running 🚀",
  });
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

app.use("/auth", authRoutes);
app.use(API_ROUTES.CATEGORIES, categoryRoutes);
app.use(API_ROUTES.SUB_CATEGORIES, subCategoryRoutes);
app.use(API_ROUTES.COMPONENT_TYPES, componentTypeRoutes);
app.use(API_ROUTES.COMPONENTS, componentRoutes);
app.use(API_ROUTES.PRODUCTS, productRoutes);
app.use(API_ROUTES.UPLOAD, uploadRoutes);
app.use(API_ROUTES.ATTRIBUTES, attributeRoutes);
app.use(API_ROUTES.PROJECTS, projectRoutes);
app.use(API_ROUTES.BLOGS, blogRoutes);
app.use(API_ROUTES.LEADS, leadRoutes);
app.use(API_ROUTES.USERS, adminUserRoutes);

app.use((error, _req, res, _next) => {
  if (error?.message === "CORS origin not allowed") {
    return res.status(403).json({ success: false, message: error.message });
  }

  return res.status(500).json({ success: false, message: error.message || "Internal server error" });
});

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
  console.log(`🌐 Allowed origins: ${allowedOrigins.join(", ")}`);
});
