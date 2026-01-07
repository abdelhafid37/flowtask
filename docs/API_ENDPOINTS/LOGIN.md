# Login Endpoint

## Overview

This endpoint authenticates a user and returns a JWT token along with user information. Use this endpoint to log in existing users to the application.

## Authentication Requirements

- **No authentication required** - This is a public endpoint used to obtain authentication credentials.

## Request Body Parameters

The request accepts a JSON payload with the following fields:

| Parameter  | Type   | Required | Description                         |
| ---------- | ------ | -------- | ----------------------------------- |
| `email`    | string | Yes      | The user's registered email address |
| `password` | string | Yes      | The user's password                 |

### Example Request Body

```json
{
  "email": "abdo@abdo.abdo",
  "password": "ABDOabdo123!"
}
```

## Response Format

### Success Response (200 OK)

Returns a JSON object containing:

| Field           | Type   | Description                                                               |
| --------------- | ------ | ------------------------------------------------------------------------- |
| `token`         | string | JWT authentication token to be used for subsequent authenticated requests |
| `user`          | object | User information object                                                   |
| `user.username` | string | The username of the authenticated user                                    |
| `user.email`    | string | The email address of the authenticated user                               |

### Example Success Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...",
  "user": {
    "username": "abdo",
    "email": "abdo@abdo.abdo"
  }
}
```

## Example Usage

1. Send a POST request to `localhost:5001/api/auth/login`
2. Include the user's email and password in the request body
3. Store the returned JWT token for use in subsequent authenticated requests
4. Include the token in the `Authorization` header as `Bearer <token>` for protected endpoints

## Notes

- The JWT token should be stored securely (e.g., in memory, secure storage, or httpOnly cookies)
- The token is used to authenticate subsequent API requests
- Ensure passwords meet the application's security requirements
- Invalid credentials will result in an authentication error response
