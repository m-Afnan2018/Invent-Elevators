// services/categories.service.js
// Categories & Sub-Categories API services

import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/apiConnector';
import { ENDPOINTS } from '@/lib/constants';

// ==================== CATEGORIES ====================

/**
 * Get all categories (with sub-categories)
 * @returns {Promise} Array of categories
 */
export const getCategories = async () => {
  try {
    const response = await apiGet(ENDPOINTS.CATEGORIES);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get single category by ID
 * @param {string} id - Category ID
 * @returns {Promise} Category data
 */
export const getCategoryById = async (id) => {
  try {
    const response = await apiGet(`${ENDPOINTS.CATEGORIES}/${id}`);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

/**
 * Create new category
 * @param {Object} categoryData - Category data
 * @returns {Promise} Created category
 */
export const createCategory = async (categoryData) => {
  try {
    const response = await apiPost(ENDPOINTS.CATEGORIES, categoryData);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

/**
 * Update category
 * @param {string} id - Category ID
 * @param {Object} categoryData - Updated category data
 * @returns {Promise} Updated category
 */
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await apiPut(`${ENDPOINTS.CATEGORIES}/${id}`, categoryData);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete category
 * @param {string} id - Category ID
 * @returns {Promise} Success message
 */
export const deleteCategory = async (id) => {
  try {
    const response = await apiDelete(`${ENDPOINTS.CATEGORIES}/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// ==================== SUB-CATEGORIES ====================

/**
 * Get all sub-categories
 * @returns {Promise} Array of sub-categories
 */
export const getSubCategories = async () => {
  try {
    const response = await apiGet(ENDPOINTS.SUB_CATEGORIES);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get sub-categories by parent category
 * @param {string} categoryId - Parent category ID
 * @returns {Promise} Array of sub-categories
 */
export const getSubCategoriesByCategory = async (categoryId) => {
  try {
    const response = await apiGet(`${ENDPOINTS.SUB_CATEGORIES}?parent=${categoryId}`);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

/**
 * Create new sub-category
 * @param {Object} subCategoryData - Sub-category data (must include parentId)
 * @returns {Promise} Created sub-category
 */
export const createSubCategory = async (subCategoryData) => {
  try {
    const response = await apiPost(ENDPOINTS.SUB_CATEGORIES, subCategoryData);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

/**
 * Update sub-category
 * @param {string} id - Sub-category ID
 * @param {Object} subCategoryData - Updated sub-category data
 * @returns {Promise} Updated sub-category
 */
export const updateSubCategory = async (id, subCategoryData) => {
  try {
    const response = await apiPut(`${ENDPOINTS.SUB_CATEGORIES}/${id}`, subCategoryData);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete sub-category
 * @param {string} id - Sub-category ID
 * @returns {Promise} Success message
 */
export const deleteSubCategory = async (id) => {
  try {
    const response = await apiDelete(`${ENDPOINTS.SUB_CATEGORIES}/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
