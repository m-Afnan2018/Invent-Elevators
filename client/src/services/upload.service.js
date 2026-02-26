// services/upload.service.js
// File Upload API service

import apiConnector from '@/lib/apiConnector';
import { ENDPOINTS } from '@/lib/constants';

/**
 * Upload single file
 * @param {File} file - File object
 * @returns {Promise} Upload response with file URL
 */
export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiConnector.post(ENDPOINTS.UPLOAD, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data || response;
  } catch (error) {
    throw error;
  }
};

/**
 * Upload multiple files
 * @param {FileList|Array} files - Array of file objects
 * @returns {Promise} Upload response with array of file URLs
 */
export const uploadMultipleFiles = async (files) => {
  try {
    const formData = new FormData();
    
    // Append all files
    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });

    const response = await apiConnector.post(ENDPOINTS.UPLOAD, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data || response;
  } catch (error) {
    throw error;
  }
};

/**
 * Upload image with preview
 * @param {File} file - Image file
 * @returns {Promise} Upload response with image URL
 */
export const uploadImage = async (file) => {
  try {
    // Validate if file is an image
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image');
    }

    return await uploadFile(file);
  } catch (error) {
    throw error;
  }
};

/**
 * Convert file to Base64 (for preview before upload)
 * @param {File} file - File object
 * @returns {Promise<string>} Base64 string
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
