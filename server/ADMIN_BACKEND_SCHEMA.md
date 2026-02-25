# Admin Panel Backend + Database Schema

This backend now includes API resources and MongoDB schemas mapped to the Admin frontend modules:

- Categories (`/api/categories`)
- Sub-categories (`/api/sub-categories`)
- Attributes (`/api/attributes`)
- Components (`/api/components`)
- Products (`/api/products`)
- Projects (`/api/projects`)
- Blogs (`/api/blogs`)
- Leads (`/api/leads`)
- Admin Users (`/api/users`)

## Entity relationships

- `Category` 1 -> N `SubCategory`
- `Attribute` may belong to a `Category`
- `Component` may belong to a `ComponentType` and may reference an `Attribute`
- `Product` may reference multiple categories, sub-categories, and components
- `Project` may reference linked products
- `Lead` may reference assigned admin user and interested products

## Notes

- All collections include `createdAt` and `updatedAt` (Mongoose timestamps).
- List APIs return data sorted latest-first by default, except where explicit `order` sorting is used.
- Existing frontend mock-field patterns (status, meta info, nested arrays, dynamic fields) are represented in schema fields.
