// lib/apiConnector.js
// Main API connector with Axios instance and interceptors

import axios from 'axios';
import { API_BASE_URL } from './constants';

// Create Axios instance
const apiConnector = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // IMPORTANT: Include cookies in requests
});

// Request Interceptor
apiConnector.interceptors.request.use(
  (config) => {
    // You can add custom headers here if needed
    // For example, if you want to add a token from localStorage:
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
apiConnector.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response.data; // Return only data, not full response
  },
  (error) => {
    console.error('❌ API Error:', error.response?.status, error.config?.url);
    
    // Handle specific error cases
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - redirect to login
          console.error('Unauthorized. Redirecting to login...');
          // Only redirect if not already on login page
          if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth/login')) {
            window.location.href = '/auth/login';
          }
          break;
          
        case 403:
          console.error('Forbidden:', data.message);
          break;
          
        case 404:
          console.error('Not Found:', data.message);
          break;
          
        case 500:
          console.error('Server Error:', data.message);
          break;
          
        default:
          console.error('Error:', data.message || 'Unknown error');
      }
      
      return Promise.reject(data || error);
    } else if (error.request) {
      // Request made but no response
      console.error('No response from server. Check if backend is running.');
      return Promise.reject({ message: 'No response from server' });
    } else {
      // Something else happened
      console.error('Request setup error:', error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

export default apiConnector;

// Helper function for GET requests
export const apiGet = (url, config = {}) => {
  return apiConnector.get(url, config);
};

// Helper function for POST requests
export const apiPost = (url, data = {}, config = {}) => {
  return apiConnector.post(url, data, config);
};

// Helper function for PUT requests
export const apiPut = (url, data = {}, config = {}) => {
  return apiConnector.put(url, data, config);
};

// Helper function for DELETE requests
export const apiDelete = (url, config = {}) => {
  return apiConnector.delete(url, config);
};

// Helper function for PATCH requests
export const apiPatch = (url, data = {}, config = {}) => {
  return apiConnector.patch(url, data, config);
};
