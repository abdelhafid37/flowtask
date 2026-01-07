# Update Task Status

## Overview

This endpoint updates the status of an existing task in the system. Use this endpoint to change a task's current status to track its progress through your workflow.

## Endpoint

```
PUT /api/tasks/{taskId}
```

## URL Parameters

- `taskId` (string, required): The unique identifier of the task to update

## Request Body

### Schema

```json
{
  "type": "object",
  "properties": {
    "status": {
      "type": "string",
      "enum": ["in-progress"]
    }
  }
}
```

### Example Request Body

```json
{
  "status": "in-progress"
}
```

**Note**: The status field accepts predefined values. Based on the schema, "in-progress" is a valid status value. Other possible status values may include "pending", "completed", "cancelled", etc.

## Response Codes

### Success Responses

- **200 OK**: Task status updated successfully
  ```json
  {
    "id": "695dc90c9b464e8aab2fbd6c",
    "status": "in-progress",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
  ```

### Error Responses

- **400 Bad Request**: Invalid request body or status value

  ```json
  {
    "error": "Invalid status value"
  }
  ```

- **401 Unauthorized**: Missing or invalid authentication token

  ```json
  {
    "error": "Authentication required"
  }
  ```

- **403 Forbidden**: User does not have permission to update this task

  ```json
  {
    "error": "forbidden request"
  }
  ```

  _This error indicates that while you are authenticated, you lack the necessary permissions to modify this specific task. Ensure you are the task owner or have appropriate access rights._

- **404 Not Found**: Task with the specified ID does not exist

  ```json
  {
    "error": "Task not found"
  }
  ```

- **500 Internal Server Error**: Server-side error occurred
  ```json
  {
    "error": "Internal server error"
  }
  ```

## Authentication

This endpoint requires authentication. Include your authentication token in the request headers (typically as a Bearer token or session cookie).

## Usage Example

### cURL

```bash
curl -X PUT http://localhost:5001/api/tasks/695dc90c9b464e8aab2fbd6c \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -d '{"status":"in-progress"}'
```

### JavaScript (Fetch API)

```javascript
fetch("http://localhost:5001/api/tasks/695dc90c9b464e8aab2fbd6c", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_AUTH_TOKEN",
  },
  body: JSON.stringify({
    status: "in-progress",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

## Notes

- Ensure the task ID in the URL is valid and exists in the system
- Verify you have the necessary permissions to update the task before making the request
- The status value must match one of the allowed enum values defined in the API
