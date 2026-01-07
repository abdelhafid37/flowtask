# User Registration Endpoint

## Overview

This endpoint allows new users to register an account in the system. It creates a new user with the provided credentials and returns the registration status.

## Endpoint Details

- **Method:** POST
- **URL:** `localhost:5001/api/auth/register`
- **Authentication:** None required (public endpoint)
- **Content-Type:** application/json

## Request Body Parameters

The request body must be sent as JSON with the following fields:

| Parameter  | Type   | Required | Description                              |
| ---------- | ------ | -------- | ---------------------------------------- |
| `username` | string | Yes      | The desired username for the new account |
| `email`    | string | Yes      | Valid email address for the user account |
| `password` | string | Yes      | Password meeting security requirements   |

### Password Requirements

Based on the validation pattern, passwords must contain:

- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (e.g., !, @, #, $, %)
- Minimum length requirements (typically 8+ characters)

### Example Request Body

```json
{
  "username": "abdo",
  "email": "abdo@abdo.abdo",
  "password": "ABDOabdo123!"
}
```

## Success Response

**Status Code:** `201 Created` or `200 OK`

```json
{
  "success": true,
  "message": "User registered successfully",
  "userId": "unique-user-id",
  "token": "jwt-authentication-token"
}
```

## Error Responses

### 400 Bad Request

Returned when validation fails or required fields are missing.

```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    "Password must contain at least one uppercase letter",
    "Email format is invalid"
  ]
}
```

### 409 Conflict

Returned when the username or email already exists in the system.

```json
{
  "success": false,
  "message": "User already exists",
  "field": "email"
}
```

### 500 Internal Server Error

Returned when a server error occurs during registration.

```json
{
  "success": false,
  "message": "Registration failed. Please try again later."
}
```

## Notes

- Email addresses must be unique in the system
- Usernames must be unique in the system
- Passwords are securely hashed before storage
- This is a public endpoint and does not require authentication
- After successful registration, users can proceed to login
