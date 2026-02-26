// services/products.service.js
// Products API services

import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/apiConnector';
import { ENDPOINTS } from '@/lib/constants';

/**
 * Get all products
 * @returns {Promise} Array of products
 */
export const getProducts = async () => {
  try {
    const response = await apiGet(ENDPOINTS.PRODUCTS);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get single product by ID
 * @param {string} id - Product ID
 * @returns {Promise} Product data
 */
export const getProductById = async (id) => {
  try {
    const response = await apiGet(`${ENDPOINTS.PRODUCTS}/${id}`);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

/**
 * Create new product
 * @param {Object} productData - Product data
 * @returns {Promise} Created product
 */
export const createProduct = async (productData) => {
  try {
    const response = await apiPost(ENDPOINTS.PRODUCTS, productData);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

/**
 * Update product
 * @param {string} id - Product ID
 * @param {Object} productData - Updated product data
 * @returns {Promise} Updated product
 */
export const updateProduct = async (id, productData) => {
  try {
    const response = await apiPut(`${ENDPOINTS.PRODUCTS}/${id}`, productData);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete product
 * @param {string} id - Product ID
 * @returns {Promise} Success message
 */
export const deleteProduct = async (id) => {
  try {
    const response = await apiDelete(`${ENDPOINTS.PRODUCTS}/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get products by category
 * @param {string} categoryId - Category ID
 * @returns {Promise} Array of products
 */
export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await apiGet(`${ENDPOINTS.PRODUCTS}?category=${categoryId}`);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};
