import express from 'express';
const taskRoutes = express.Router();
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/task.js';
import { protect } from '../middleware/authMiddleware.js';

taskRoutes.get("/", protect, getTasks);
taskRoutes.post("/", protect, createTask);
taskRoutes.put("/:id", protect, updateTask);
taskRoutes.delete("/:id", protect, deleteTask);

export default taskRoutes;
