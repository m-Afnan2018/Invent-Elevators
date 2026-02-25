/**
 * Server Entry + App Setup (Merged)
 * --------------------------------
 * This file:
 * - Loads environment variables
 * - Connects MongoDB
 * - Initializes Express app
 * - Registers all routes
 * - Starts the server
 *
 * No src/ folder used
 */

import express from "express";
import dotenv from "dotenv";

/* -------------------- Route Imports -------------------- */
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
import connectDB from "./configs/db.js";
import API_ROUTES from "./apis.js";



/* -------------------- Config -------------------- */
dotenv.config();

const app = express();

/* -------------------- Database Connection -------------------- */
connectDB();

/* -------------------- Middlewares -------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------- Routes -------------------- */

// Health check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Lift Backend API is running 🚀",
    });
});

// Feature routes
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
// app.use("/api/categories", categoryRoutes);
// app.use("/api/sub-categories", subCategoryRoutes);
// app.use("/api/component-types", componentTypeRoutes);
// app.use("/api/components", componentRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/upload", uploadRoutes);
// app.use("/api/attributes", attributeRoutes);
// app.use("/api/projects", projectRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/leads", leadRoutes);
// app.use("/api/users", adminUserRoutes);

/* -------------------- 404 Handler -------------------- */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

/* -------------------- Server -------------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
    );
});
