/**
 * Cloudinary Configuration
 * ------------------------
 * Centralized Cloudinary setup.
 * Used for uploading images (categories, components, products).
 */

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
