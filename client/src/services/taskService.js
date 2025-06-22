import axiosInstance from "../utils/axiosInst";

export const createTask = async (taskData) => {
    try {
        const response = await axiosInstance.post("/api/tasks", taskData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getTasks = async () => {
    try {
        const response = await axiosInstance.get("/api/tasks");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateTask = async (taskId, taskData) => {
    try {
        const response = await axiosInstance.put(`/api/tasks/${taskId}`, taskData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await axiosInstance.delete(`/api/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};