# Running the Backend Example API tests

This file explains how to run the Postman collection included with the project to verify the API endpoints.

Prerequisites
- Node.js and npm installed
- The API server running locally (see project README)

1) Start the server

Copy the example env file and start the server from the project root:

```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

2) Import the collection

Open Postman and import the file `tests/Backend_Example_API_with_checks.postman_collection.json`.

3) Run the collection

Use the Collection Runner in Postman. Ensure the server base URL and port are `http://localhost:3000` (update if you use a different PORT in `.env`).

What the collection tests
- Health check for `/`
- Messages: create, list, and not-found check
- Users: create, list, and invalid-id check

If any tests fail, copy the response and server logs and paste them into an issue or here for debugging.
# Thunder Client Collection for VS Code

This folder contains Thunder Client test requests for the Backend Example API.

## Available Requests:

### 1. Create Message (POST)
- **URL**: `http://localhost:3000/api/messages`
- **Method**: POST
- **Body**: 
```json
{
  "author": "John Doe",
  "text": "This is a test message created via API",
  "isRead": false
}
```

### 2. Get All Messages (GET)
- **URL**: `http://localhost:3000/api/messages`
- **Method**: GET

### 3. Get Message by ID (GET)
- **URL**: `http://localhost:3000/api/messages/msg-001`
- **Method**: GET

### 4. Update Message (PUT)
- **URL**: `http://localhost:3000/api/messages/msg-001`
- **Method**: PUT
- **Body**:
```json
{
  "author": "Jane Doe",
  "text": "This message has been updated!",
  "isRead": true
}
```

### 5. Delete Message (DELETE)
- **URL**: `http://localhost:3000/api/messages/msg-001`
- **Method**: DELETE

### 6. Health Check (GET)
- **URL**: `http://localhost:3000/`
- **Method**: GET

## Expected Response Format:

### Success Response:
```json
{
  "success": true,
  "data": {
    // Response data here
  }
}
```

### Error Response:
```json
{
  "success": false,
  "error": "Descriptive error message"
}
```

## How to Use:

1. Install Thunder Client extension in VS Code
2. Start the server: `npm run dev`
3. Import the collection or create requests manually using the URLs above
4. Test each endpoint and verify the response format