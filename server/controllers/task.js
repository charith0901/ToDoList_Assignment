import Task from "../models/Task.js";

export const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority, tags } = req.body;
        const task = new Task({
            title,
            description,
            dueDate: new Date(dueDate),
            priority,
            tags,
            userId: req.user._id
        });
        const createdTask = await task.save();
        res.status(201).json(createdTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const updateTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority, tags } = req.body;
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.priority = priority;
        task.tags = tags;
        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const overViewTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id });
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.isCompleted).length;
        const pendingTasks = totalTasks - completedTasks;
        const overdueTasks = tasks.filter(task => new Date(task.dueDate) < new Date() && !task.isCompleted);
        const today = new Date();
        const todayTasks = tasks
            .filter(task => new Date(task.dueDate).toDateString() === today.toDateString())
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

        res.status(200).json({
            totalTasks,
            completedTasks,
            pendingTasks,
            overdueTasks,
            todayTasks
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.isCompleted = !task.isCompleted;
        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const overdueTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id });
        const overdueTasks = tasks.filter(task => new Date(task.dueDate) < new Date() && !task.isCompleted);
        res.status(200).json(overdueTasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}