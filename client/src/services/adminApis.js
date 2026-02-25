const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const withId = (path, id) => `${path}/${id}`;

export const ADMIN_API = {
  HEALTH: `${BASE_URL}/`,

  CATEGORIES: `${BASE_URL}/api/categories`,
  CATEGORY_BY_ID: (id) => withId(`${BASE_URL}/api/categories`, id),

  SUB_CATEGORIES: `${BASE_URL}/api/sub-categories`,
  SUB_CATEGORY_BY_ID: (id) => withId(`${BASE_URL}/api/sub-categories`, id),
  SUB_CATEGORIES_BY_CATEGORY: (categoryId) => `${BASE_URL}/api/sub-categories/by-category/${categoryId}`,

  COMPONENT_TYPES: `${BASE_URL}/api/component-types`,
  COMPONENT_TYPE_BY_ID: (id) => withId(`${BASE_URL}/api/component-types`, id),

  ATTRIBUTES: `${BASE_URL}/api/attributes`,
  ATTRIBUTE_BY_ID: (id) => withId(`${BASE_URL}/api/attributes`, id),

  COMPONENTS: `${BASE_URL}/api/components`,
  COMPONENT_BY_ID: (id) => withId(`${BASE_URL}/api/components`, id),
  COMPONENTS_BY_TYPE: (typeId) => `${BASE_URL}/api/components/by-type/${typeId}`,

  PRODUCTS: `${BASE_URL}/api/products`,
  PRODUCT_BY_ID: (id) => withId(`${BASE_URL}/api/products`, id),

  PROJECTS: `${BASE_URL}/api/projects`,
  PROJECT_BY_ID: (id) => withId(`${BASE_URL}/api/projects`, id),

  BLOGS: `${BASE_URL}/api/blogs`,
  BLOG_BY_ID: (id) => withId(`${BASE_URL}/api/blogs`, id),

  LEADS: `${BASE_URL}/api/leads`,
  LEAD_BY_ID: (id) => withId(`${BASE_URL}/api/leads`, id),

  USERS: `${BASE_URL}/api/users`,
  USER_BY_ID: (id) => withId(`${BASE_URL}/api/users`, id),

  UPLOAD: `${BASE_URL}/api/upload`,
};

export default ADMIN_API;
