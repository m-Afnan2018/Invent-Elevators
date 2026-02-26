// services/leads.service.js
// Lead Forms API services

import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/apiConnector';
import { ENDPOINTS } from '@/lib/constants';

export const getLeads = async () => {
  try {
    const response = await apiGet(ENDPOINTS.LEADS);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const getLeadById = async (id) => {
  try {
    const response = await apiGet(`${ENDPOINTS.LEADS}/${id}`);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const createLead = async (leadData) => {
  try {
    const response = await apiPost(ENDPOINTS.LEADS, leadData);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const updateLead = async (id, leadData) => {
  try {
    const response = await apiPut(`${ENDPOINTS.LEADS}/${id}`, leadData);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const deleteLead = async (id) => {
  try {
    const response = await apiDelete(`${ENDPOINTS.LEADS}/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getLeadsByStatus = async (status) => {
  try {
    const response = await apiGet(`${ENDPOINTS.LEADS}?status=${status}`);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const getLeadsByPriority = async (priority) => {
  try {
    const response = await apiGet(`${ENDPOINTS.LEADS}?priority=${priority}`);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};
