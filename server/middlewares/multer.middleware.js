/**
 * Multer Middleware Factory
 * ------------------------
 * Creates multer instances using diskStorage for local file persistence.
 * Files are saved to: uploads/images/{folder}/
 *
 * Usage:
 *   const { uploadSingle, uploadArray } = createUploadMiddleware('products');
 */

import multer from "multer";
import path from "path";
import fs from "fs";

const UPLOAD_BASE = path.resolve("uploads", "images");

const ALLOWED_MIME = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);

const fileFilter = (_req, file, cb) => {
    if (ALLOWED_MIME.has(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only jpeg, jpg, png, and webp images are allowed"), false);
    }
};

const limits = { fileSize: 10 * 1024 * 1024 }; // 10 MB per file

/**
 * Slugify a filename stem for safe, readable filenames.
 * e.g. "My Photo (1).jpg" → "my-photo-1"
 */
const slugify = (str) =>
    str
        .toLowerCase()
        .replace(/\.[^.]+$/, "") // strip extension
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 60) || "file";

/**
 * Factory: returns { uploadSingle, uploadArray } for the given folder.
 * Saves files to uploads/images/{folder}/
 *
 * @param {string} folder - e.g. "products", "categories", "blogs", "users", "misc"
 */
export const createUploadMiddleware = (folder) => {
    const dest = path.join(UPLOAD_BASE, folder);
    fs.mkdirSync(dest, { recursive: true });

    const storage = multer.diskStorage({
        destination: (_req, _file, cb) => cb(null, dest),
        filename: (_req, file, cb) => {
            const stem = slugify(file.originalname);
            const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
            const ts = Date.now();
            cb(null, `${stem}-${ts}${ext}`);
        },
    });

    const instance = multer({ storage, limits, fileFilter });

    return {
        uploadSingle: instance.single("image"),
        uploadArray: instance.array("images", 20),
    };
};

// Default middleware for misc/unspecified uploads
const defaultMiddleware = createUploadMiddleware("misc");
export const uploadSingle = defaultMiddleware.uploadSingle;
export const uploadArray = defaultMiddleware.uploadArray;
