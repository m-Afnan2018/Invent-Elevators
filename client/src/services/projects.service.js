// services/projects.service.js
// Projects API services

import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/apiConnector';
import { ENDPOINTS } from '@/lib/constants';
import { extractData } from '@/lib/apiResponse';

export const getProjects = async () => {
  try {
    const response = await apiGet(ENDPOINTS.PROJECTS);
    return extractData(response);
  } catch (error) {
    throw error;
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await apiGet(`${ENDPOINTS.PROJECTS}/${id}`);
    return extractData(response);
  } catch (error) {
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await apiPost(ENDPOINTS.PROJECTS, projectData);
    return extractData(response);
  } catch (error) {
    throw error;
  }
};

export const updateProject = async (id, projectData) => {
  try {
    const response = await apiPut(`${ENDPOINTS.PROJECTS}/${id}`, projectData);
    return extractData(response);
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await apiDelete(`${ENDPOINTS.PROJECTS}/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProjectsByStatus = async (status) => {
  try {
    const response = await apiGet(`${ENDPOINTS.PROJECTS}?status=${status}`);
    return extractData(response);
  } catch (error) {
    throw error;
  }
};
