# Create Task

## Overview

This endpoint creates a new task in the system. It accepts task details in the request body and returns the created task object with a unique identifier and timestamps.

## Request Body Parameters

| Parameter     | Type              | Required | Description                                                                              |
| ------------- | ----------------- | -------- | ---------------------------------------------------------------------------------------- |
| `title`       | string            | Yes      | The title or name of the task (e.g., "fishing", "morning workout")                       |
| `description` | string            | Yes      | A detailed description of what the task involves                                         |
| `dueDate`     | string (ISO 8601) | Yes      | The due date and time for the task in ISO 8601 format (e.g., "2023-04-10T12:00:00.000Z") |
| `status`      | string            | Yes      | The current status of the task (e.g., "pending", "completed")                            |

## Response

### Success Response (201 Created)

The API returns the created task object with additional system-generated fields:

```json
{
  "title": "fishing",
  "description": "catch a big fish",
  "status": "pending",
  "dueDate": "2023-04-10T12:00:00.000Z",
  "user": "695bebafe98e4cd03d824ae8",
  "_id": "695dccc556f155fefaa10627",
  "createdAt": "2026-01-07T03:02:29.287Z",
  "updatedAt": "2026-01-07T03:02:29.287Z",
  "__v": 0
}
```

**Response Fields:**

- `_id`: Unique identifier for the created task
- `user`: ID of the user who created the task
- `createdAt`: Timestamp when the task was created
- `updatedAt`: Timestamp when the task was last updated
- `__v`: Version key for document versioning
- All original request fields are included in the response

## Example Usage

**Request:**

```json
{
  "title": "fishing",
  "description": "catch a big fish",
  "dueDate": "2023-04-10T12:00:00.000Z",
  "status": "pending"
}
```

**Notes:**

- Ensure the `dueDate` is in valid ISO 8601 format
- Authentication may be required (user ID is automatically associated with the task)
- The response includes server-generated fields that should not be included in the request
