# Taskflow

A full-stack Project & Task Management app built with the MERN stack and Redux Toolkit.

---

## Tech Stack

### Frontend

- React.js
- Redux Toolkit (state management)
- Axios (API requests)
- React Router DOM (navigation)

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (authentication)
- bcryptjs (password hashing)

---

## Features

- **Authentication** — Signup, Login, JWT-based session persistence
- **Projects** — Create, view, and delete projects
- **Tasks** — Create tasks inside projects, mark complete/incomplete, delete tasks, optional due date
- **Light / Dark Mode**
- **Redux** — Global state management with separate slices for auth, projects, and tasks

---

## Project Structure

```
taskflow/
├── backend/
│   ├── models/          # Mongoose models (User, Project, Task)
│   ├── routes/          # Express routes (auth, projects, tasks)
│   ├── middleware/       # JWT auth middleware
│   ├── .env             # Environment variables
│   └── server.js        # Entry point
│
└── frontend/
    ├── src/
    │   ├── app/         # Redux store
    │   ├── features/    # Redux slices (auth, projects, tasks)
    │   ├── pages/       # Login, Signup, Dashboard, ProjectDetail
    │   ├── components/  # Reusable UI components
    │   └── api/         # Axios instance
    └── public/
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account

### 1. Clone the repo

```bash
git clone https://github.com/your-username/taskflow.git
cd taskflow
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm start
```

---

## API Endpoints

### Auth

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| POST   | `/api/auth/signup` | Register a new user   |
| POST   | `/api/auth/login`  | Login and receive JWT |

### Projects

| Method | Endpoint            | Description      |
| ------ | ------------------- | ---------------- |
| GET    | `/api/projects`     | Get all projects |
| POST   | `/api/projects`     | Create a project |
| DELETE | `/api/projects/:id` | Delete a project |

### Tasks

| Method | Endpoint                | Description                     |
| ------ | ----------------------- | ------------------------------- |
| GET    | `/api/tasks/:projectId` | Get tasks for a project         |
| POST   | `/api/tasks`            | Create a task                   |
| PATCH  | `/api/tasks/:id`        | Toggle task complete/incomplete |
| DELETE | `/api/tasks/:id`        | Delete a task                   |

---
