## Delete Task by ID

This endpoint deletes a specific task from the system using its unique identifier.

### URL Pattern

```
DELETE /api/tasks/{taskId}
```

**Path Parameter:**

- `taskId` (string, required) - The unique identifier of the task to be deleted. This should be a valid MongoDB ObjectId.

### Expected Response

**Status Code:** `200 OK`

The endpoint returns the deleted task object upon successful deletion.

**Response Body:**

```json
{
  "_id": "string",
  "title": "string",
  "description": "string",
  "status": "string",
  "dueDate": "string (ISO 8601 date)",
  "user": "string",
  "createdAt": "string (ISO 8601 date)",
  "updatedAt": "string (ISO 8601 date)",
  "__v": "number"
}
```

### Response Fields

| Field         | Type   | Description                                                  |
| ------------- | ------ | ------------------------------------------------------------ |
| `_id`         | string | The unique identifier of the deleted task (MongoDB ObjectId) |
| `title`       | string | The title/name of the task                                   |
| `description` | string | Detailed description of the task                             |
| `status`      | string | Current status of the task (e.g., "pending", "completed")    |
| `dueDate`     | string | The due date for the task in ISO 8601 format                 |
| `user`        | string | The ID of the user who owns this task                        |
| `createdAt`   | string | Timestamp when the task was created (ISO 8601 format)        |
| `updatedAt`   | string | Timestamp when the task was last updated (ISO 8601 format)   |
| `__v`         | number | Version key used by MongoDB for document versioning          |

### Example Response

```json
{
  "_id": "695dccc556f155fefaa10627",
  "title": "fishing",
  "description": "catch a big fish",
  "status": "pending",
  "dueDate": "2023-04-10T12:00:00.000Z",
  "user": "695bebafe98e4cd03d824ae8",
  "createdAt": "2026-01-07T03:02:29.287Z",
  "updatedAt": "2026-01-07T03:02:29.287Z",
  "__v": 0
}
```
