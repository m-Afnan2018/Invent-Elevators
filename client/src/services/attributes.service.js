// services/attributes.service.js
// Attributes (Component Types) API services

import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/apiConnector';
import { ENDPOINTS } from '@/lib/constants';

export const getAttributes = async () => {
  try {
    const response = await apiGet(ENDPOINTS.ATTRIBUTES);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const getAttributeById = async (id) => {
  try {
    const response = await apiGet(`${ENDPOINTS.ATTRIBUTES}/${id}`);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const createAttribute = async (attributeData) => {
  try {
    const response = await apiPost(ENDPOINTS.ATTRIBUTES, attributeData);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const updateAttribute = async (id, attributeData) => {
  try {
    const response = await apiPut(`${ENDPOINTS.ATTRIBUTES}/${id}`, attributeData);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const deleteAttribute = async (id) => {
  try {
    const response = await apiDelete(`${ENDPOINTS.ATTRIBUTES}/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
