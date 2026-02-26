// services/components.service.js
// Components API services

import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/apiConnector';
import { ENDPOINTS } from '@/lib/constants';

export const getComponents = async () => {
  try {
    const response = await apiGet(ENDPOINTS.COMPONENTS);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const getComponentById = async (id) => {
  try {
    const response = await apiGet(`${ENDPOINTS.COMPONENTS}/${id}`);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const createComponent = async (componentData) => {
  try {
    const response = await apiPost(ENDPOINTS.COMPONENTS, componentData);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const updateComponent = async (id, componentData) => {
  try {
    const response = await apiPut(`${ENDPOINTS.COMPONENTS}/${id}`, componentData);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const deleteComponent = async (id) => {
  try {
    const response = await apiDelete(`${ENDPOINTS.COMPONENTS}/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getComponentsByAttribute = async (attributeId) => {
  try {
    const response = await apiGet(`${ENDPOINTS.COMPONENTS}?attributeId=${attributeId}`);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};
