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
import mongoose from "mongoose";

/* -------------------- Route Imports -------------------- */
import categoryRoutes from "./routes/category.routes.js";
import subCategoryRoutes from "./routes/subCategory.routes.js";
import componentTypeRoutes from "./routes/componentType.routes.js";
import componentRoutes from "./routes/component.routes.js";
import productRoutes from "./routes/product.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import connectDB from "./configs/db.js";



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
app.use("/api/categories", categoryRoutes);
app.use("/api/sub-categories", subCategoryRoutes);
app.use("/api/component-types", componentTypeRoutes);
app.use("/api/components", componentRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);

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
