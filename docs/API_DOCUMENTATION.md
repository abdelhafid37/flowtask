# Taskflow API Documentation

Base URL: `http://localhost:5000/api`

## Table of Contents

- [Authentication](#authentication)
- [Tasks](#tasks)
- [Error Responses](#error-responses)

---

## Authentication

All task-related endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### Register User

**Endpoint:** `POST /auth/register`

**Description:** Create a new user account

**Request Body:**

```json
{
  "username": "string (required)",
  "email": "string (required, valid email)",
  "password": "string (required, min 6 characters)"
}
```

**Success Response (201):**

```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "username": "john_doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

- `400 Bad Request` - Missing required fields or validation errors
- `409 Conflict` - Email or username already exists

**Example:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

---

### Login User

**Endpoint:** `POST /auth/login`

**Description:** Authenticate user and receive JWT token

**Request Body:**

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**

- `400 Bad Request` - Missing email or password
- `401 Unauthorized` - Invalid credentials

**Example:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

---

## Tasks

All task endpoints require authentication via JWT token.

### Get All Tasks

**Endpoint:** `GET /tasks`

**Description:** Retrieve all tasks for the authenticated user

**Headers:**

```
Authorization: Bearer <token>
```

**Query Parameters (Optional):**

- `status` - Filter by status (pending, in-progress, completed)
- `sort` - Sort field (createdAt, dueDate, title)
- `order` - Sort order (asc, desc)

**Success Response (200):**

```json
{
  "success": true,
  "count": 2,
  "tasks": [
    {
      "_id": "task_id_1",
      "title": "Complete project documentation",
      "description": "Write comprehensive API docs",
      "status": "in-progress",
      "dueDate": "2024-01-20T00:00:00.000Z",
      "user": "user_id",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "task_id_2",
      "title": "Review code changes",
      "description": null,
      "status": "pending",
      "dueDate": "2024-01-18T00:00:00.000Z",
      "user": "user_id",
      "createdAt": "2024-01-14T09:20:00.000Z",
      "updatedAt": "2024-01-14T09:20:00.000Z"
    }
  ]
}
```

**Error Responses:**

- `401 Unauthorized` - Invalid or missing token

**Example:**

```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer jwt_token_here"
```

**Example with filters:**

```bash
curl -X GET "http://localhost:5000/api/tasks?status=pending&sort=dueDate&order=asc" \
  -H "Authorization: Bearer jwt_token_here"
```

---

### Create Task

**Endpoint:** `POST /tasks`

**Description:** Create a new task for the authenticated user

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "status": "string (optional, default: 'pending')",
  "dueDate": "ISO 8601 date string (optional)"
}
```

**Status values:** `pending`, `in-progress`, `completed`

**Success Response (201):**

```json
{
  "success": true,
  "task": {
    "_id": "task_id",
    "title": "Complete project documentation",
    "description": "Write comprehensive API docs",
    "status": "pending",
    "dueDate": "2024-01-20T00:00:00.000Z",
    "user": "user_id",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

- `400 Bad Request` - Missing title or validation errors
- `401 Unauthorized` - Invalid or missing token

**Example:**

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer jwt_token_here" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive API docs",
    "status": "in-progress",
    "dueDate": "2024-01-20T00:00:00.000Z"
  }'
```

---

### Update Task

**Endpoint:** `PUT /tasks/:id`

**Description:** Update an existing task (only if owned by authenticated user)

**Headers:**

```
Authorization: Bearer <token>
```

**URL Parameters:**

- `id` - Task ID

**Request Body (all fields optional):**

```json
{
  "title": "string",
  "description": "string",
  "status": "string",
  "dueDate": "ISO 8601 date string"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "task": {
    "_id": "task_id",
    "title": "Updated title",
    "description": "Updated description",
    "status": "completed",
    "dueDate": "2024-01-20T00:00:00.000Z",
    "user": "user_id",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-16T14:20:00.000Z"
  }
}
```

**Error Responses:**

- `400 Bad Request` - Invalid task ID format
- `401 Unauthorized` - Invalid or missing token
- `403 Forbidden` - User does not own this task
- `404 Not Found` - Task not found

**Example:**

```bash
curl -X PUT http://localhost:5000/api/tasks/task_id_here \
  -H "Authorization: Bearer jwt_token_here" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

---

### Delete Task

**Endpoint:** `DELETE /tasks/:id`

**Description:** Delete a task (only if owned by authenticated user)

**Headers:**

```
Authorization: Bearer <token>
```

**URL Parameters:**

- `id` - Task ID

**Success Response (200):**

```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

**Error Responses:**

- `400 Bad Request` - Invalid task ID format
- `401 Unauthorized` - Invalid or missing token
- `403 Forbidden` - User does not own this task
- `404 Not Found` - Task not found

**Example:**

```bash
curl -X DELETE http://localhost:5000/api/tasks/task_id_here \
  -H "Authorization: Bearer jwt_token_here"
```

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

### Common HTTP Status Codes

| Code | Description                                   |
| ---- | --------------------------------------------- |
| 200  | Success                                       |
| 201  | Created successfully                          |
| 400  | Bad Request - Invalid input                   |
| 401  | Unauthorized - Authentication required        |
| 403  | Forbidden - Not authorized to access resource |
| 404  | Not Found - Resource does not exist           |
| 409  | Conflict - Resource already exists            |
| 500  | Internal Server Error                         |

### Authentication Errors

**Invalid Token:**

```json
{
  "success": false,
  "error": "Invalid token"
}
```

**Token Expired:**

```json
{
  "success": false,
  "error": "Token has expired"
}
```

**No Token Provided:**

```json
{
  "success": false,
  "error": "No token provided"
}
```

---

## Rate Limiting

Currently, there are no rate limits implemented. Consider implementing rate limiting in production.

## Notes

- All dates should be in ISO 8601 format
- JWT tokens expire after 30 days (configurable)
- All timestamps are in UTC
- Task descriptions can be null/empty
- Due dates are optional
