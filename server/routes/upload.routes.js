/**
 * Upload Routes
 * -------------
 * Handles image uploads to Cloudinary.
 */

import express from "express";
import multer from "multer";
import cloudinary from "../configs/cloudinary.js";

const router = express.Router();

/* -------------------- Multer Setup -------------------- */
// Store file in memory (NOT disk)
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

/* -------------------- Upload API -------------------- */

router.post("/", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        // Convert buffer to base64
        const fileBase64 = req.file.buffer.toString("base64");
        const fileUri = `data:${req.file.mimetype};base64,${fileBase64}`;

        const result = await cloudinary.uploader.upload(fileUri, {
            folder: "lift-project",
        });

        res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            data: {
                url: result.secure_url,
                public_id: result.public_id,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

export default router;


/**
 * Delete Image API
 * ----------------
 * Deletes image from Cloudinary using public_id.
 *
 * Use case:
 * - Remove old category image
 * - Replace component image
 * - Cleanup unused uploads
 */

router.delete("/", async (req, res) => {
    try {
        const { public_id } = req.body;

        if (!public_id) {
            return res.status(400).json({
                success: false,
                message: "public_id is required",
            });
        }

        const result = await cloudinary.uploader.destroy(public_id);

        if (result.result !== "ok") {
            return res.status(400).json({
                success: false,
                message: "Failed to delete image",
            });
        }

        res.status(200).json({
            success: true,
            message: "Image deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
