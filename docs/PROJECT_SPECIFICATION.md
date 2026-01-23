# Taskflow - Project Specification

## Project Overview

Taskflow is a full-stack MERN (MongoDB, Express, React, Node.js) task management application that allows users to register, authenticate, and manage their personal tasks with full CRUD operations.

## Core Features

### Authentication

- User registration with email and password
- Secure login with JWT token generation
- Password hashing using bcrypt
- Protected routes requiring authentication
- Logout functionality

### Task Management

- Create tasks with title, description, status, and due date
- View all user-specific tasks
- Edit existing tasks
- Delete tasks
- Update task status (Pending, In Progress, Completed)
- Tasks are user-specific (users only see their own tasks)

## Technology Stack

### Backend

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables
- **nodemon**: Auto restart node server

```sh
npm init -y
npm install express dotenv cors bcryptjs mongoose jsonwebtoken
npm install -D nodemon
```

### Frontend

- **React**: UI library
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Tailwind**: Styling

## Database Schema

### User Model

```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date (default: Date.now)
}
```

### Task Model

```javascript
{
  title: String (required),
  description: String (optional),
  status: String (enum: ['pending', 'in-progress', 'completed'], default: 'pending'),
  dueDate: Date (optional),
  user: ObjectId (ref: 'User', required),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint    | Description       | Auth Required |
| ------ | ----------- | ----------------- | ------------- |
| POST   | `/register` | Register new user | No            |
| POST   | `/login`    | Login user        | No            |

### Task Routes (`/api/tasks`)

| Method | Endpoint | Description        | Auth Required |
| ------ | -------- | ------------------ | ------------- |
| GET    | `/`      | Get all user tasks | Yes           |
| POST   | `/`      | Create new task    | Yes           |
| PUT    | `/:id`   | Update task by ID  | Yes           |
| DELETE | `/:id`   | Delete task by ID  | Yes           |

## Frontend Routes

| Path         | Component | Description               | Protected |
| ------------ | --------- | ------------------------- | --------- |
| `/`          | Login     | User login page           | No        |
| `/register`  | Register  | User registration page    | No        |
| `/dashboard` | Dashboard | Task management dashboard | Yes       |

## File Creation Order

### Phase 1: Backend Foundation (backend/)

1. `server.js` - Main server file
2. `.env` - Environment variables
3. `config/db.js` - MongoDB connection
4. `models/User.js` - User model
5. `models/Task.js` - Task model

### Phase 2: Backend Authentication

6. `middleware/auth.js` - JWT verification middleware
7. `controllers/authController.js` - Auth logic
8. `routes/authRoutes.js` - Auth endpoints

### Phase 3: Backend Task Management

9. `controllers/taskController.js` - Task CRUD logic
10. `routes/taskRoutes.js` - Task endpoints

### Phase 4: Frontend Foundation (frontend/)

11. `src/App.jsx` - Main app component
12. `src/index.css` - Global styles
13. `src/services/api.js` - Axios configuration
14. `src/context/AuthContext.jsx` - Authentication context

### Phase 5: Frontend Components

15. `src/components/Navbar.jsx` - Navigation bar
16. `src/components/PrivateRoute.jsx` - Protected route wrapper
17. `src/pages/Login.jsx` - Login page
18. `src/pages/Register.jsx` - Register page
19. `src/pages/Dashboard.jsx` - Main dashboard

### Phase 6: Frontend Task Components

20. `src/components/TaskForm.jsx` - Create/Edit task form
21. `src/components/TaskList.jsx` - Task list container
22. `src/components/TaskItem.jsx` - Individual task card
23. `src/components/TaskFilter.jsx` - Filter tasks by status (optional)

## Environment Variables

### Backend (.env)

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Implementation Steps

### Step 1: Backend Setup

1. Initialize Node.js project
2. Install dependencies
3. Set up MongoDB connection
4. Create models (User, Task)
5. Implement authentication routes
6. Implement task CRUD routes
7. Test all endpoints with Postman/Thunder Client

### Step 2: Frontend Setup

1. Create React app
2. Install dependencies
3. Set up routing
4. Create authentication context
5. Build authentication pages (Login, Register)
6. Implement authentication flow

### Step 3: Task Management UI

1. Create task display components
2. Implement task creation form
3. Add edit functionality
4. Add delete functionality
5. Implement status updates

### Step 4: Polish & Testing

1. Add form validation
2. Implement error handling
3. Add loading states
4. Style the application
5. Test all user flows
6. Fix bugs and refine UX

## Testing Checklist

### Authentication

- [ ] User can register with valid credentials
- [ ] User cannot register with existing email
- [ ] User can login with correct credentials
- [ ] User cannot login with wrong credentials
- [ ] JWT token is stored properly
- [ ] User can logout

### Task Management

- [ ] User can create a new task
- [ ] User can view all their tasks
- [ ] User can edit a task
- [ ] User can delete a task
- [ ] User can update task status
- [ ] User only sees their own tasks
- [ ] Tasks persist after logout/login

## Future Enhancements

- Task categories/tags
- Priority levels
- Task search functionality
- Due date reminders
- Task statistics/analytics
- Dark mode
- Mobile responsiveness
- Profile management
- Password reset functionality

## Success Criteria

- Users can successfully register and login
- Authentication persists across page refreshes
- All CRUD operations work correctly
- Data is properly secured (users can only access their own tasks)
- Application is responsive and user-friendly
- No security vulnerabilities (passwords hashed, JWT secured)
