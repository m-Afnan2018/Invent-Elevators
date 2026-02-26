// services/blogs.service.js
// Blogs API services

import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/apiConnector';
import { ENDPOINTS } from '@/lib/constants';

/**
 * Get all blogs
 * @returns {Promise} Array of blogs
 */
export const getBlogs = async () => {
  try {
    const response = await apiGet(ENDPOINTS.BLOGS);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get single blog by ID
 * @param {string} id - Blog ID
 * @returns {Promise} Blog data
 */
export const getBlogById = async (id) => {
  try {
    const response = await apiGet(`${ENDPOINTS.BLOGS}/${id}`);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get blog by slug
 * @param {string} slug - Blog slug
 * @returns {Promise} Blog data
 */
export const getBlogBySlug = async (slug) => {
  try {
    const response = await apiGet(`${ENDPOINTS.BLOGS}/slug/${slug}`);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

/**
 * Create new blog
 * @param {Object} blogData - Blog data
 * @returns {Promise} Created blog
 */
export const createBlog = async (blogData) => {
  try {
    const response = await apiPost(ENDPOINTS.BLOGS, blogData);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

/**
 * Update blog
 * @param {string} id - Blog ID
 * @param {Object} blogData - Updated blog data
 * @returns {Promise} Updated blog
 */
export const updateBlog = async (id, blogData) => {
  try {
    const response = await apiPut(`${ENDPOINTS.BLOGS}/${id}`, blogData);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete blog
 * @param {string} id - Blog ID
 * @returns {Promise} Success message
 */
export const deleteBlog = async (id) => {
  try {
    const response = await apiDelete(`${ENDPOINTS.BLOGS}/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get blogs by status
 * @param {string} status - Blog status (draft, published, scheduled, archived)
 * @returns {Promise} Array of blogs
 */
export const getBlogsByStatus = async (status) => {
  try {
    const response = await apiGet(`${ENDPOINTS.BLOGS}?status=${status}`);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get blogs by tag
 * @param {string} tag - Tag name
 * @returns {Promise} Array of blogs
 */
export const getBlogsByTag = async (tag) => {
  try {
    const response = await apiGet(`${ENDPOINTS.BLOGS}?tag=${tag}`);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};
