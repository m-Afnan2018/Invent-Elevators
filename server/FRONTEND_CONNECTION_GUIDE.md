# Frontend ↔ Backend Connection Guide

This backend is now aligned with the existing frontend API usage (`NEXT_PUBLIC_API_URL`, `/auth/*`, and `/api/*` routes).

## 1) Install backend dependencies

```bash
cd server
npm install
```

## 2) Create environment file

Create `server/.env` with:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/invent-elevators
FRONTEND_URL=http://localhost:3000
JWT_SECRET=replace-with-a-strong-secret
JWT_EXPIRES_IN=7d
COOKIE_EXPIRES_DAYS=7

# Optional for upload endpoint
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 3) Start backend

```bash
cd server
npm run dev
```

Backend base URL: `http://localhost:5000`

## 4) Configure frontend

Set frontend env (`client/.env.local` for Next.js):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Then run frontend:

```bash
cd client
npm install
npm run dev
```

## 5) Route map used by frontend

### Auth (now available)
- `POST /auth/signup`
- `POST /auth/login`
- `GET /auth/me` (cookie based)
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `POST /auth/logout`

### Admin CRUD
- `/api/categories`
- `/api/sub-categories`
- `/api/component-types`
- `/api/components`
- `/api/products`
- `/api/projects`
- `/api/blogs`
- `/api/leads`
- `/api/users`
- `/api/upload`

## 6) CORS + Cookie notes

- Backend enables CORS with credentials using `FRONTEND_URL`.
- Auth token is stored in an HTTP-only cookie named `token`.
- In development, `sameSite=lax` and `secure=false`.

## 7) Quick health check

```bash
curl http://localhost:5000/
```

Expected: success JSON response (`Lift Backend API is running`).
