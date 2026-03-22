// services/upload.service.js
// File Upload API service — uploads to local server storage via the backend.
// Returns full absolute URLs so they can be stored in the DB and used directly
// in Next.js <Image> without any further transformation.

import apiConnector from '@/lib/apiConnector';
import { ENDPOINTS, API_BASE_URL } from '@/lib/constants';

/** Convert a relative server path to a full URL. */
const toFullUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${API_BASE_URL}${path}`;
};

/**
 * Upload a single image file.
 * @param {File} file
 * @param {string} [folder] - storage subfolder: products|categories|blogs|users|misc
 * @returns {Promise<string>} absolute URL to the uploaded image
 */
export const uploadImage = async (file, folder = 'misc') => {
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image');
  }

  const formData = new FormData();
  formData.append('image', file);

  const response = await apiConnector.post(`${ENDPOINTS.UPLOAD}?folder=${folder}`, formData);

  const url = response?.data?.url;
  if (!url) throw new Error('Upload failed — no URL returned');
  return toFullUrl(url);
};

/**
 * Upload multiple image files (up to 20).
 * @param {File[]|FileList} files
 * @param {string} [folder] - storage subfolder: products|categories|blogs|users|misc
 * @returns {Promise<string[]>} array of absolute URLs
 */
export const uploadMultipleImages = async (files, folder = 'misc') => {
  const fileArray = Array.from(files);
  if (!fileArray.length) return [];

  const formData = new FormData();
  fileArray.forEach((f) => formData.append('images', f));

  const response = await apiConnector.post(`${ENDPOINTS.UPLOAD}/multiple?folder=${folder}`, formData);

  const results = response?.data;
  if (!Array.isArray(results)) throw new Error('Upload failed — unexpected response');
  return results.map((r) => toFullUrl(r.url));
};

/**
 * Delete a local image by its URL or relative path.
 * @param {string} fileUrl - full URL or relative path like /uploads/images/products/foo.jpg
 * @returns {Promise<void>}
 */
export const deleteImage = async (fileUrl) => {
  // Extract the relative path from a full URL if needed
  const filePath = fileUrl.startsWith('http')
    ? new URL(fileUrl).pathname
    : fileUrl;
  await apiConnector.delete(ENDPOINTS.UPLOAD, { data: { filePath } });
};

/**
 * Convert a file to a local base64 data URL (for instant preview before upload).
 * Does NOT upload anything — purely local.
 * @param {File} file
 * @returns {Promise<string>} base64 data URL
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
