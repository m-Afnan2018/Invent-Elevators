// services/auth.service.js
// Authentication API services

import { apiPost, apiGet } from '@/lib/apiConnector';
import { ENDPOINTS } from '@/lib/constants';
import { extractData } from '@/lib/apiResponse';

/**
 * User Signup
 * @param {Object} userData - { firstName, lastName, email, password }
 * @returns {Promise} User data
 */
export const signup = async (userData) => {
  try {
    const response = await apiPost(ENDPOINTS.AUTH.SIGNUP, userData);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * User Login
 * @param {Object} credentials - { email, password }
 * @returns {Promise} User data with token (stored in HTTP-only cookie)
 */
export const login = async (credentials) => {
  try {
    const response = await apiPost(ENDPOINTS.AUTH.LOGIN, credentials);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * User Logout
 * @returns {Promise} Success message
 */
export const logout = async () => {
  try {
    const response = await apiPost(ENDPOINTS.AUTH.LOGOUT);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get Current User
 * @returns {Promise} Current user data
 */
export const getCurrentUser = async () => {
  try {
    const response = await apiGet(ENDPOINTS.AUTH.ME);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get dashboard access for current user
 * @returns {Promise} { allowed, role, permissions }
 */
export const getDashboardAccess = async () => {
  try {
    const response = await apiGet(ENDPOINTS.AUTH.DASHBOARD_ACCESS);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Forgot Password
 * @param {Object} data - { email }
 * @returns {Promise} Success message
 */
export const forgotPassword = async (data) => {
  try {
    const response = await apiPost(ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Reset Password
 * @param {Object} data - { token, password }
 * @returns {Promise} Success message
 */
export const resetPassword = async (data) => {
  try {
    const response = await apiPost(ENDPOINTS.AUTH.RESET_PASSWORD, data);
    return response;
  } catch (error) {
    throw error;
  }
};
