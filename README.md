# Student Management System — Full Project

A complete Student Management System: a React (Vite) frontend and a
Node.js/Express/MongoDB backend, packaged together.

## Structure

```
student-management-system/
├── frontend/     # React + Vite SPA (Dashboard, Students, Add/Edit/Details, About)
└── backend/      # Node.js + Express + MongoDB REST API
```

Each half has its own README with full setup instructions:

- `frontend/README.md` — how the pages are wired together, running the dev server
- `backend/README.md` — MongoDB setup, .env config, API endpoints, example requests

## Quick Start

**1. Backend**
```bash
cd backend
npm install
npm run dev
```
Runs on `http://localhost:5000` (needs MongoDB running — see `backend/README.md`).

**2. Frontend**
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`.

## Connecting Them

Right now the frontend keeps all student data in React state (in-memory
sample data). To connect it to the backend API, see the "Connecting to a
Backend" section in `frontend/README.md` — it points to exactly which
functions in `frontend/src/App.jsx` to replace with `axios` calls to
`http://localhost:5000/api/students`.
