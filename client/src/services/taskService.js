import axiosInstance from "../utils/axiosInst";
import toast from "react-hot-toast";

export const createTask = async (taskData) => {
    await toast.promise(async () => {
        const response = await axiosInstance.post("/api/tasks", taskData);
        return response.data;
    }, {
        loading: "Creating task...",
        success: "Task created successfully!",
        error: (err) => `Error creating task: ${err.response?.data?.message || err.message}`
    });
};
export const getTasks = async () => {
    try {
        const response = await axiosInstance.get("/api/tasks");
        return response.data;
    } catch (error) {
        toast.error(`Error fetching tasks: ${error.response?.data?.message || error.message}`);
        throw error;
    }
};

export const updateTask = async (taskId, taskData) => {
    await toast.promise(async () => {
        const response = await axiosInstance.put(`/api/tasks/${taskId}`, taskData);
        return response.data;
    }, {
        loading: "Updating task...",
        success: "Task updated successfully!",
        error: (err) => `Error updating task: ${err.response?.data?.message || err.message}`
    });
};

export const deleteTask = async (taskId) => {
    await toast.promise(async () => {
        const response = await axiosInstance.delete(`/api/tasks/${taskId}`);
        return response.data;
    }, {
        loading: "Deleting task...",
        success: "Task deleted successfully!",
        error: (err) => `Error deleting task: ${err.response?.data?.message || err.message}`
    });
};

export const overViewTasks = async () => {
    try {
        const response = await axiosInstance.get("/api/tasks/overview");
        return response.data;
    } catch (error) {
        toast.error(`Error fetching task overview: ${error.response?.data?.message || error.message}`);
        throw error;
    }
}

export const updateTaskStatus = async (taskId) => {
    await toast.promise(async () => {
        try {
            const response = await axiosInstance.put(`/api/tasks/${taskId}/status`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }, {
        loading: "Updating task status...",
        success: "Task status updated successfully!",
        error: (err) => `Error updating task status: ${err.response?.data?.message || err.message}`
    });
}

export const getOverdueTasks = async () => {
    try {
        const response = await axiosInstance.get("/api/tasks/overdue");
        return response.data;
    } catch (error) {
        toast.error(`Error fetching overdue tasks: ${error.response?.data?.message || error.message}`);
        throw error;
    }
}