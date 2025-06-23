import express from 'express';
const taskRoutes = express.Router();
import { createTask, getTasks, updateTask, deleteTask, overViewTasks, updateTaskStatus, overdueTasks } from '../controllers/task.js';
import { protect } from '../middleware/authMiddleware.js';

taskRoutes.get("/", protect, getTasks);
taskRoutes.post("/", protect, createTask);
taskRoutes.put("/:id", protect, updateTask);
taskRoutes.delete("/:id", protect, deleteTask);
taskRoutes.get("/overview", protect, overViewTasks);
taskRoutes.put("/:id/status", protect, updateTaskStatus);
taskRoutes.get("/overdue", protect, overdueTasks);

export default taskRoutes;
