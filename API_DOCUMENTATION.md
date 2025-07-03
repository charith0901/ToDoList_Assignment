# Comprehensive API Documentation
## Task Management Application

This document provides complete documentation for all public APIs, functions, and components in the Task Management Application.

---

## 📋 Table of Contents

1. [Backend API Documentation](#backend-api-documentation)
2. [Frontend Components Documentation](#frontend-components-documentation)
3. [Service Functions Documentation](#service-functions-documentation)
4. [Data Models Documentation](#data-models-documentation)
5. [State Management Documentation](#state-management-documentation)
6. [Middleware Documentation](#middleware-documentation)

---

## 🚀 Backend API Documentation

### Base URL
- Development: `http://localhost:3000`
- Production: `https://todolistassignment-production.up.railway.app`

### Authentication
All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

### 🔐 Authentication Endpoints

#### 1. Register User
**POST** `/api/auth/register`

Creates a new user account.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "user": {
    "_id": "string",
    "username": "string",
    "email": "string"
  },
  "token": "string",
  "refreshToken": "string"
}
```

**Example Usage:**
```javascript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'john_doe',
    email: 'john@example.com',
    password: 'securePassword123'
  })
});
```

#### 2. Login User
**POST** `/api/auth/login`

Authenticates a user and returns JWT tokens.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "user": {
    "_id": "string",
    "username": "string",
    "email": "string"
  },
  "token": "string",
  "refreshToken": "string"
}
```

#### 3. Get Current User
**GET** `/api/auth/me`

Returns current authenticated user information.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "user": {
    "_id": "string",
    "username": "string",
    "email": "string"
  }
}
```

#### 4. Forgot Password
**POST** `/api/auth/forget-password`

Sends password reset email to user.

**Request Body:**
```json
{
  "email": "string"
}
```

**Response:**
```json
{
  "message": "Password reset email sent"
}
```

#### 5. Reset Password
**POST** `/api/auth/reset-password/:token`

Resets user password using reset token.

**URL Parameters:**
- `token`: Reset token from email

**Request Body:**
```json
{
  "password": "string"
}
```

**Response:**
```json
{
  "message": "Password reset successful"
}
```

#### 6. Update Password
**PUT** `/api/auth/update-password`

Updates user password (requires authentication).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "currentPassword": "string",
  "newPassword": "string"
}
```

**Response:**
```json
{
  "message": "Password updated successfully"
}
```

#### 7. Refresh Token
**GET** `/api/auth/refresh`

Refreshes JWT access token using refresh token.

**Headers:** `Authorization: Bearer <refresh_token>`

**Response:**
```json
{
  "token": "string",
  "refreshToken": "string"
}
```

---

### 📝 Task Management Endpoints

#### 1. Get All Tasks
**GET** `/api/tasks`

Retrieves all tasks for authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "_id": "string",
    "title": "string",
    "description": "string",
    "dueDate": "2024-01-01T00:00:00.000Z",
    "isCompleted": false,
    "userId": "string"
  }
]
```

#### 2. Create Task
**POST** `/api/tasks`

Creates a new task for authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "dueDate": "2024-01-01T00:00:00.000Z"
}
```

**Response:**
```json
{
  "_id": "string",
  "title": "string",
  "description": "string",
  "dueDate": "2024-01-01T00:00:00.000Z",
  "isCompleted": false,
  "userId": "string"
}
```

**Example Usage:**
```javascript
const newTask = await fetch('/api/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'Complete project documentation',
    description: 'Write comprehensive API documentation',
    dueDate: '2024-01-15T10:00:00.000Z'
  })
});
```

#### 3. Update Task
**PUT** `/api/tasks/:id`

Updates an existing task.

**Headers:** `Authorization: Bearer <token>`

**URL Parameters:**
- `id`: Task ID

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "dueDate": "2024-01-01T00:00:00.000Z"
}
```

#### 4. Delete Task
**DELETE** `/api/tasks/:id`

Deletes a task.

**Headers:** `Authorization: Bearer <token>`

**URL Parameters:**
- `id`: Task ID

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

#### 5. Update Task Status
**PUT** `/api/tasks/:id/status`

Toggles task completion status.

**Headers:** `Authorization: Bearer <token>`

**URL Parameters:**
- `id`: Task ID

**Response:**
```json
{
  "_id": "string",
  "title": "string",
  "description": "string",
  "dueDate": "2024-01-01T00:00:00.000Z",
  "isCompleted": true,
  "userId": "string"
}
```

#### 6. Get Task Overview
**GET** `/api/tasks/overview`

Returns task statistics and overview data.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "totalTasks": 10,
  "completedTasks": 5,
  "pendingTasks": 5,
  "overdueTasks": [
    {
      "_id": "string",
      "title": "string",
      "description": "string",
      "dueDate": "2023-12-01T00:00:00.000Z",
      "isCompleted": false
    }
  ],
  "todayTasks": [
    {
      "_id": "string",
      "title": "string",
      "description": "string",
      "dueDate": "2024-01-01T00:00:00.000Z",
      "isCompleted": false
    }
  ]
}
```

#### 7. Get Overdue Tasks
**GET** `/api/tasks/overdue`

Returns all overdue tasks for authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "_id": "string",
    "title": "string",
    "description": "string",
    "dueDate": "2023-12-01T00:00:00.000Z",
    "isCompleted": false,
    "userId": "string"
  }
]
```

---

## 🎨 Frontend Components Documentation

### Authentication Components

#### 1. Login Component
**File:** `client/src/components/auth/Login.jsx`

Login form component with email and password validation.

**Props:** None

**Usage:**
```jsx
import Login from './components/auth/Login';

function App() {
  return <Login />;
}
```

**Features:**
- Email and password validation
- Error handling with toast notifications
- Automatic redirection after successful login
- "Remember me" functionality
- Link to registration and forgot password

#### 2. Register Component
**File:** `client/src/components/auth/Register.jsx`

User registration form component.

**Props:** None

**Usage:**
```jsx
import Register from './components/auth/Register';

function App() {
  return <Register />;
}
```

**Features:**
- Username, email, and password validation
- Password confirmation
- Real-time validation feedback
- Error handling with toast notifications

#### 3. ForgotPassword Component
**File:** `client/src/components/auth/ForgotPassword.jsx`

Password reset request form.

**Props:** None

**Usage:**
```jsx
import ForgotPassword from './components/auth/ForgotPassword';

function App() {
  return <ForgotPassword />;
}
```

#### 4. ResetPassword Component
**File:** `client/src/components/auth/ResetPassword.jsx`

Password reset form with token validation.

**Props:** None (uses URL parameters)

**Usage:**
```jsx
import ResetPassword from './components/auth/ResetPassword';

function App() {
  return <ResetPassword />;
}
```

#### 5. UpdatePassword Component
**File:** `client/src/components/auth/UpdatePasswod.jsx`

Change password form for authenticated users.

**Props:** None

**Usage:**
```jsx
import UpdatePassword from './components/auth/UpdatePasswod';

function App() {
  return <UpdatePassword />;
}
```

### Dashboard Components

#### 1. Dashboard Index
**File:** `client/src/components/dashboard/index.jsx`

Main dashboard component with task overview and navigation.

**Props:** None

**Usage:**
```jsx
import Dashboard from './components/dashboard';

function App() {
  return <Dashboard />;
}
```

**Features:**
- Task statistics display
- Navigation to different sections
- Welcome message with user info
- Quick access to create new tasks

#### 2. Overview Component
**File:** `client/src/components/dashboard/overView.jsx`

Detailed task overview with statistics and charts.

**Props:** None

**Usage:**
```jsx
import Overview from './components/dashboard/overView';

function App() {
  return <Overview />;
}
```

**Features:**
- Total, completed, and pending task counts
- Today's tasks list
- Overdue tasks display
- Task completion rate visualization

#### 3. Profile Component
**File:** `client/src/components/dashboard/profile.jsx`

User profile management component.

**Props:** None

**Usage:**
```jsx
import Profile from './components/dashboard/profile';

function App() {
  return <Profile />;
}
```

### Task Management Components

#### 1. Tasks Index
**File:** `client/src/components/task/index.jsx`

Main task management interface with task list and controls.

**Props:** None

**Usage:**
```jsx
import Tasks from './components/task';

function App() {
  return <Tasks />;
}
```

**Features:**
- Task list display
- Filter and search functionality
- Task status toggle
- Edit and delete actions
- Pagination support

#### 2. Create Task Component
**File:** `client/src/components/task/create.jsx`

Task creation form component.

**Props:**
- `onTaskCreated`: Function called after successful task creation

**Usage:**
```jsx
import CreateTask from './components/task/create';

function App() {
  const handleTaskCreated = (newTask) => {
    console.log('New task created:', newTask);
  };

  return <CreateTask onTaskCreated={handleTaskCreated} />;
}
```

#### 3. Update Task Component
**File:** `client/src/components/task/update.jsx`

Task editing form component.

**Props:**
- `task`: Task object to edit
- `onTaskUpdated`: Function called after successful update

**Usage:**
```jsx
import UpdateTask from './components/task/update';

function App() {
  const task = {
    _id: '123',
    title: 'Sample Task',
    description: 'Task description',
    dueDate: '2024-01-01'
  };

  const handleTaskUpdated = (updatedTask) => {
    console.log('Task updated:', updatedTask);
  };

  return <UpdateTask task={task} onTaskUpdated={handleTaskUpdated} />;
}
```

#### 4. Overdue Tasks Component
**File:** `client/src/components/task/overDue.jsx`

Display component for overdue tasks.

**Props:** None

**Usage:**
```jsx
import OverdueTasks from './components/task/overDue';

function App() {
  return <OverdueTasks />;
}
```

### Common Components

#### 1. ProtectedRoute Component
**File:** `client/src/components/common/ProtectedRoute.jsx`

Route protection component for authenticated routes.

**Props:**
- `children`: React components to render if authenticated

**Usage:**
```jsx
import ProtectedRoute from './components/common/ProtectedRoute';
import Dashboard from './components/dashboard';

function App() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
```

#### 2. StatCard Component
**File:** `client/src/components/common/StatCard.jsx`

Reusable statistics card component.

**Props:**
- `title`: Card title
- `value`: Numeric value to display
- `icon`: Icon component
- `color`: Card color theme

**Usage:**
```jsx
import StatCard from './components/common/StatCard';
import { CheckCircle } from 'lucide-react';

function Dashboard() {
  return (
    <StatCard
      title="Completed Tasks"
      value={15}
      icon={CheckCircle}
      color="green"
    />
  );
}
```

#### 3. TaskCard Component
**File:** `client/src/components/common/TaskCard.jsx`

Reusable task display card component.

**Props:**
- `task`: Task object
- `onStatusChange`: Function called when task status changes
- `onEdit`: Function called when edit button is clicked
- `onDelete`: Function called when delete button is clicked

**Usage:**
```jsx
import TaskCard from './components/common/TaskCard';

function TaskList() {
  const task = {
    _id: '123',
    title: 'Sample Task',
    description: 'Task description',
    dueDate: '2024-01-01',
    isCompleted: false
  };

  return (
    <TaskCard
      task={task}
      onStatusChange={(taskId) => console.log('Status changed:', taskId)}
      onEdit={(task) => console.log('Edit task:', task)}
      onDelete={(taskId) => console.log('Delete task:', taskId)}
    />
  );
}
```

### Welcome Component

#### Welcome Page
**File:** `client/src/components/welcome/welcome.jsx`

Landing page component for unauthenticated users.

**Props:** None

**Usage:**
```jsx
import Welcome from './components/welcome/welcome';

function App() {
  return <Welcome />;
}
```

---

## 🔧 Service Functions Documentation

### Authentication Service
**File:** `client/src/services/authService.js`

#### register(userData)
Registers a new user account.

**Parameters:**
- `userData`: Object containing username, email, and password

**Returns:** Promise

**Example:**
```javascript
import { register } from './services/authService';

const userData = {
  username: 'john_doe',
  email: 'john@example.com',
  password: 'securePassword123'
};

await register(userData);
```

#### login(credentials)
Authenticates user with email and password.

**Parameters:**
- `credentials`: Object containing email and password

**Example:**
```javascript
import { login } from './services/authService';

const credentials = {
  email: 'john@example.com',
  password: 'securePassword123'
};

await login(credentials);
```

#### logout()
Logs out current user and clears tokens.

**Example:**
```javascript
import { logout } from './services/authService';

logout();
```

#### getCurrentUser()
Fetches current authenticated user information.

**Returns:** Promise resolving to user object

**Example:**
```javascript
import { getCurrentUser } from './services/authService';

const user = await getCurrentUser();
console.log(user);
```

#### forgetPassword(email)
Sends password reset email.

**Parameters:**
- `email`: User's email address

**Example:**
```javascript
import { forgetPassword } from './services/authService';

await forgetPassword('john@example.com');
```

#### resetPassword(token, newPassword)
Resets password using reset token.

**Parameters:**
- `token`: Reset token from email
- `newPassword`: New password

**Example:**
```javascript
import { resetPassword } from './services/authService';

await resetPassword('reset-token', 'newSecurePassword123');
```

#### updatePassword(currentPassword, newPassword)
Updates user password.

**Parameters:**
- `currentPassword`: Current password
- `newPassword`: New password

**Example:**
```javascript
import { updatePassword } from './services/authService';

await updatePassword('oldPassword', 'newPassword');
```

### Task Service
**File:** `client/src/services/taskService.js`

#### createTask(taskData)
Creates a new task.

**Parameters:**
- `taskData`: Object containing title, description, and dueDate

**Example:**
```javascript
import { createTask } from './services/taskService';

const taskData = {
  title: 'Complete project',
  description: 'Finish the task management app',
  dueDate: '2024-01-15T10:00:00.000Z'
};

await createTask(taskData);
```

#### getTasks()
Retrieves all tasks for current user.

**Returns:** Promise resolving to array of tasks

**Example:**
```javascript
import { getTasks } from './services/taskService';

const tasks = await getTasks();
console.log(tasks);
```

#### updateTask(taskId, taskData)
Updates an existing task.

**Parameters:**
- `taskId`: Task ID
- `taskData`: Updated task data

**Example:**
```javascript
import { updateTask } from './services/taskService';

await updateTask('task-id', {
  title: 'Updated title',
  description: 'Updated description',
  dueDate: '2024-01-20T10:00:00.000Z'
});
```

#### deleteTask(taskId)
Deletes a task.

**Parameters:**
- `taskId`: Task ID

**Example:**
```javascript
import { deleteTask } from './services/taskService';

await deleteTask('task-id');
```

#### overViewTasks()
Gets task overview and statistics.

**Returns:** Promise resolving to overview object

**Example:**
```javascript
import { overViewTasks } from './services/taskService';

const overview = await overViewTasks();
console.log(overview);
// { totalTasks: 10, completedTasks: 5, pendingTasks: 5, ... }
```

#### updateTaskStatus(taskId)
Toggles task completion status.

**Parameters:**
- `taskId`: Task ID

**Example:**
```javascript
import { updateTaskStatus } from './services/taskService';

await updateTaskStatus('task-id');
```

#### getOverdueTasks()
Gets all overdue tasks.

**Returns:** Promise resolving to array of overdue tasks

**Example:**
```javascript
import { getOverdueTasks } from './services/taskService';

const overdueTasks = await getOverdueTasks();
console.log(overdueTasks);
```

---

## 🗃️ Data Models Documentation

### User Model
**File:** `server/models/User.js`

MongoDB schema for user data.

**Schema:**
```javascript
{
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
}
```

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "john_doe",
  "email": "john@example.com",
  "password": "$2a$10$...", // hashed password
  "resetPasswordToken": "abc123...",
  "resetPasswordExpires": "2024-01-01T12:00:00.000Z"
}
```

### Task Model
**File:** `server/models/Task.js`

MongoDB schema for task data.

**Schema:**
```javascript
{
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  isCompleted: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}
```

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation for the task management app",
  "dueDate": "2024-01-15T10:00:00.000Z",
  "isCompleted": false,
  "userId": "507f1f77bcf86cd799439011"
}
```

---

## 🏪 State Management Documentation

### Auth Store
**File:** `client/src/store/authStore.js`

Zustand store for authentication state management.

**State:**
```javascript
{
  user: null,           // Current user object
  token: null,          // JWT access token
  isAuthenticated: false // Authentication status
}
```

**Actions:**
- `login(user, token)`: Sets user and token, marks as authenticated
- `logout()`: Clears user and token, marks as unauthenticated

**Usage:**
```javascript
import useAuthStore from './store/authStore';

function Component() {
  const { user, token, isAuthenticated, login, logout } = useAuthStore();

  // Check if user is logged in
  if (isAuthenticated) {
    return <div>Welcome, {user.username}!</div>;
  }

  return <div>Please log in</div>;
}
```

**Persistence:**
The store automatically persists to localStorage with the key `auth-storage`.

---

## 🛡️ Middleware Documentation

### Authentication Middleware
**File:** `server/middleware/authMiddleware.js`

#### protect
Middleware function that protects routes by verifying JWT tokens.

**Usage:**
```javascript
import { protect } from './middleware/authMiddleware.js';

router.get('/protected-route', protect, (req, res) => {
  // req.user contains the authenticated user
  res.json({ user: req.user });
});
```

**Functionality:**
- Extracts JWT token from Authorization header
- Verifies token signature and expiration
- Adds user object to request (`req.user`)
- Returns 401 if token is invalid or missing

#### verifyRefreshToken
Middleware for verifying refresh tokens.

**Usage:**
```javascript
import { verifyRefreshToken } from './middleware/authMiddleware.js';

router.get('/refresh', verifyRefreshToken, refreshToken);
```

### Validation Middleware

#### Register Validation
**File:** `server/middleware/registerMiddleware.js`

Validates user registration data.

**Validation Rules:**
- Username: Required, minimum 3 characters
- Email: Required, valid email format
- Password: Required, minimum 6 characters

#### Reset Password Validation
**File:** `server/middleware/resetMiddleware.js`

Validates password reset data.

**Validation Rules:**
- Password: Required, minimum 6 characters

#### Update Password Validation
**File:** `server/middleware/updateMiddleware.js`

Validates password update data.

**Validation Rules:**
- Current password: Required
- New password: Required, minimum 6 characters

---

## 🚨 Error Handling

### HTTP Status Codes

#### Success Codes
- `200 OK`: Successful GET, PUT requests
- `201 Created`: Successful POST requests (resource created)

#### Client Error Codes
- `400 Bad Request`: Invalid request data or validation errors
- `401 Unauthorized`: Missing or invalid authentication token
- `404 Not Found`: Resource not found
- `422 Unprocessable Entity`: Validation errors

#### Server Error Codes
- `500 Internal Server Error`: Unexpected server errors

### Error Response Format

All error responses follow this format:
```json
{
  "message": "Error description"
}
```

### Example Error Handling
```javascript
try {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(taskData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const task = await response.json();
  return task;
} catch (error) {
  console.error('Error creating task:', error.message);
  throw error;
}
```

---

## 🔧 Utility Functions

### Token Management
JWT tokens are automatically managed by the authentication service:
- Access tokens expire in 2 minutes
- Refresh tokens expire in 7 days
- Automatic token refresh on API calls

### Toast Notifications
All service functions include toast notifications for user feedback:
- Loading states
- Success messages
- Error messages

**Example:**
```javascript
// Automatic toast notifications
await login({ email: 'user@example.com', password: 'password' });
// Shows: "Logging in..." → "Login successful!" or error message
```

---

## 📱 Usage Examples

### Complete Authentication Flow
```javascript
import { register, login, getCurrentUser, logout } from './services/authService';

// 1. Register new user
await register({
  username: 'john_doe',
  email: 'john@example.com',
  password: 'securePassword123'
});

// 2. Login user
await login({
  email: 'john@example.com',
  password: 'securePassword123'
});

// 3. Get current user info
const user = await getCurrentUser();

// 4. Logout
logout();
```

### Complete Task Management Flow
```javascript
import { 
  createTask, 
  getTasks, 
  updateTask, 
  updateTaskStatus, 
  deleteTask 
} from './services/taskService';

// 1. Create a new task
await createTask({
  title: 'Complete documentation',
  description: 'Write API documentation',
  dueDate: '2024-01-15T10:00:00.000Z'
});

// 2. Get all tasks
const tasks = await getTasks();

// 3. Update a task
await updateTask('task-id', {
  title: 'Updated title',
  description: 'Updated description',
  dueDate: '2024-01-20T10:00:00.000Z'
});

// 4. Mark task as completed
await updateTaskStatus('task-id');

// 5. Delete a task
await deleteTask('task-id');
```

### React Component Integration
```jsx
import React, { useState, useEffect } from 'react';
import { getTasks, createTask } from './services/taskService';
import useAuthStore from './store/authStore';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      loadTasks();
    }
  }, [isAuthenticated]);

  const loadTasks = async () => {
    try {
      const userTasks = await getTasks();
      setTasks(userTasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData);
      await loadTasks(); // Reload tasks
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  if (!isAuthenticated) {
    return <div>Please log in to manage tasks</div>;
  }

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskList tasks={tasks} />
      <CreateTaskForm onSubmit={handleCreateTask} />
    </div>
  );
}
```

---

## 🔒 Security Considerations

### Authentication Security
- Passwords are hashed using bcryptjs with salt rounds
- JWT tokens have short expiration times (2 minutes for access tokens)
- Refresh tokens provide secure token renewal
- Password reset tokens expire after 1 hour

### API Security
- All sensitive routes are protected with authentication middleware
- Input validation on all endpoints
- CORS configuration for cross-origin requests
- Environment variables for sensitive configuration

### Client-Side Security
- Tokens stored in localStorage (consider httpOnly cookies for production)
- Protected routes component prevents unauthorized access
- Automatic token refresh on API calls
- Logout functionality clears all stored tokens

---

This documentation provides comprehensive coverage of all public APIs, functions, and components in the Task Management Application. For additional support or questions, please refer to the source code or contact the development team.