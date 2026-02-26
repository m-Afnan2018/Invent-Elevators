// services/users.service.js
// Users API services

import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/apiConnector';
import { ENDPOINTS } from '@/lib/constants';

export const getUsers = async () => {
  try {
    const response = await apiGet(ENDPOINTS.USERS);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await apiGet(`${ENDPOINTS.USERS}/${id}`);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await apiPost(ENDPOINTS.USERS, userData);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await apiPut(`${ENDPOINTS.USERS}/${id}`, userData);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await apiDelete(`${ENDPOINTS.USERS}/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const resetUserPassword = async (id, passwordData) => {
  try {
    const response = await apiPost(`${ENDPOINTS.USERS}/${id}/reset-password`, passwordData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUsersByRole = async (role) => {
  try {
    const response = await apiGet(`${ENDPOINTS.USERS}?role=${role}`);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};
