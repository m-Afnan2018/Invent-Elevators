const DEFAULT_API_BASE_URL = 'http://localhost:5000';

const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_BASE_URL;

export const API_BASE_URL = rawBaseUrl.replace(/\/$/, '');

export const ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    DASHBOARD_ACCESS: '/auth/dashboard-access',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  PRODUCTS: '/api/products',
  CATEGORIES: '/api/categories',
  SUB_CATEGORIES: '/api/sub-categories',
  ATTRIBUTES: '/api/attributes',
  COMPONENTS: '/api/components',
  BLOGS: '/api/blogs',
  PROJECTS: '/api/projects',
  LEADS: '/api/leads',
  USERS: '/api/users',
  UPLOAD: '/api/upload',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
