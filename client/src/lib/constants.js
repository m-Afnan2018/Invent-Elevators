// lib/constants.js
// API Configuration Constants

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// API Endpoints
export const ENDPOINTS = {
  // Auth
  AUTH: {
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    DASHBOARD_ACCESS: '/auth/dashboard-access',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  
  // Products
  PRODUCTS: '/api/products',
  
  // Categories
  CATEGORIES: '/api/categories',
  SUB_CATEGORIES: '/api/sub-categories',
  
  // Attributes & Components
  ATTRIBUTES: '/api/attributes',
  COMPONENTS: '/api/components',
  
  // Blogs
  BLOGS: '/api/blogs',
  
  // Projects
  PROJECTS: '/api/projects',
  
  // Leads
  LEADS: '/api/leads',
  
  // Users
  USERS: '/api/users',
  
  // Upload
  UPLOAD: '/api/upload',
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
