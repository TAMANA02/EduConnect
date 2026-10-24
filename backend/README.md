# Student Management System — Backend API

A REST API for the Student Management System, built with Node.js, Express, and MongoDB (Mongoose). Designed to be consumed by the existing React frontend via Axios.

## Folder Structure

```
backend/
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   └── studentController.js   # All business logic
├── models/
│   └── Student.js             # Mongoose schema & validation
├── routes/
│   └── studentRoutes.js       # API route definitions
├── middleware/
│   └── errorMiddleware.js     # 404 + centralized error handling
├── .env                       # Environment variables (not committed)
├── .gitignore
├── package.json
└── server.js                  # App entry point
```

## 1. Install Dependencies

From inside the `backend/` folder:

```bash
npm install
```

This installs `express`, `mongoose`, `cors`, `dotenv`, and (as a dev dependency) `nodemon`.

## 2. Configure MongoDB

You need a running MongoDB instance. Two options:

**Option A — Local MongoDB**
Install and run MongoDB locally (default port `27017`). No further setup needed — the default `.env` already points at a local database.

**Option B — MongoDB Atlas (cloud)**
Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas), get your connection string, and put it in `MONGO_URI` (see below).

The API will automatically create the `student_management` database and `students` collection the first time you add a student — no manual setup required.

## 3. Configure `.env`

A `.env` file is already included with sensible local defaults:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/student_management
```

If you're using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string, e.g.:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/student_management
```

`.env` is listed in `.gitignore` — never commit real credentials.

## 4. Start the Server

Development (auto-restarts on file changes):

```bash
npm run dev
```

Production:

```bash
npm start
```

You should see:

```
MongoDB connected: 127.0.0.1
Server running on port 5000
```

Confirm it's alive by visiting `http://localhost:5000/` — you should get:

```json
{ "success": true, "message": "Student Management API is running" }
```

## 5. API Endpoints

Base URL: `http://localhost:5000/api/students`

| Method | Endpoint            | Description                                      |
|--------|----------------------|---------------------------------------------------|
| GET    | `/api/students`      | Get all students. Supports `search`, `course`, `sortBy`, `order` query params |
| GET    | `/api/students/:id`  | Get a single student by ID                        |
| POST   | `/api/students`      | Create a new student                               |
| PUT    | `/api/students/:id`  | Update an existing student                         |
| DELETE | `/api/students/:id`  | Delete a student                                   |

### Query Parameters for `GET /api/students`

| Param    | Example        | Description                                  |
|----------|-----------------|-----------------------------------------------|
| `search` | `?search=riya`  | Case-insensitive partial match on name        |
| `course` | `?course=BCA`   | Exact match on course (omit or `All` for all) |
| `sortBy` | `?sortBy=name`  | `name` or `age`                                |
| `order`  | `?order=asc`    | `asc` (default) or `desc`                      |

Example combined query:
```
GET /api/students?search=sh&course=B.Tech&sortBy=age&order=desc
```

### Student Fields

| Field         | Type   | Required | Notes                                  |
|----------------|--------|----------|------------------------------------------|
| `name`         | String | Yes      |                                            |
| `age`          | Number | Yes      | Must be between 16 and 60                 |
| `course`       | String | Yes      |                                            |
| `email`        | String | Yes      | Must be a valid email format               |
| `phone`        | String | No       | Must be exactly 10 digits if provided      |
| `gender`       | String | No       | `Male`, `Female`, or `Other`               |
| `address`      | String | No       |                                            |
| `studentId`    | String | Auto     | Auto-generated (e.g. `STU-4821`) if omitted; must be unique |
| `joiningDate`  | Date   | No       | Defaults to the current date               |
| `createdAt`    | Date   | Auto     | Set by Mongoose                            |
| `updatedAt`    | Date   | Auto     | Set by Mongoose                            |

### Response Format

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message"
}
```

## 6. Example API Requests

### Get all students
```bash
curl http://localhost:5000/api/students
```

### Search by name
```bash
curl "http://localhost:5000/api/students?search=priya"
```

### Filter by course, sorted by age descending
```bash
curl "http://localhost:5000/api/students?course=B.Tech&sortBy=age&order=desc"
```

### Get a single student
```bash
curl http://localhost:5000/api/students/665f1c2e8b1e4a2d3c9f0a11
```

### Create a student
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rahul Sharma",
    "age": 20,
    "course": "BCA",
    "email": "rahul.sharma@email.com",
    "phone": "9876543210",
    "gender": "Male",
    "address": "Kanpur, Uttar Pradesh"
  }'
```

### Update a student
```bash
curl -X PUT http://localhost:5000/api/students/665f1c2e8b1e4a2d3c9f0a11 \
  -H "Content-Type: application/json" \
  -d '{ "age": 21, "course": "MCA" }'
```

### Delete a student
```bash
curl -X DELETE http://localhost:5000/api/students/665f1c2e8b1e4a2d3c9f0a11
```

## Connecting from the React Frontend (Axios)

```js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Get all students
const { data } = await api.get("/students");

// Search + filter + sort
const { data } = await api.get("/students", {
  params: { search: "priya", course: "B.Tech", sortBy: "name", order: "asc" },
});

// Add a student
await api.post("/students", newStudentForm);

// Update a student
await api.put(`/students/${id}`, updatedFields);

// Delete a student
await api.delete(`/students/${id}`);
```

Make sure CORS is enabled on the backend (it is, via the `cors` package) so the frontend — typically running on `http://localhost:3000` or `http://localhost:5173` — can call this API on port `5000` without being blocked.
