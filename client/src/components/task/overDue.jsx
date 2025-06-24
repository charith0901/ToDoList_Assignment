import React, { useEffect, useState } from "react";
import { getOverdueTasks, updateTaskStatus, deleteTask } from "../../services/taskService";
import TaskCard from "../common/TaskCard";
import { Link } from "react-router-dom";

const OverDueTasks = () => {
    const [overdueTasks, setOverdueTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOverdueTasks = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getOverdueTasks();
            setOverdueTasks(data);
        } catch (error) {
            console.error("Error fetching overdue tasks:", error);
            setError("Failed to load overdue tasks. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOverdueTasks();
    }, []); const handleUpdateTaskStatus = async (taskId) => {
        try {
            await updateTaskStatus(taskId);
            fetchOverdueTasks();
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            fetchOverdueTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-red-600 mb-2 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Overdue Tasks
                </h2>
                <p className="text-gray-600">Tasks that have passed their due date</p>
            </div>

            {loading && (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                    <span className="ml-2 text-gray-600">Loading overdue tasks...</span>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <p className="text-red-700">{error}</p>
                    </div>
                    <button
                        onClick={fetchOverdueTasks}
                        className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {!loading && !error && overdueTasks.length === 0 && (
                <div className="text-center py-12">
                    <svg className="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No overdue tasks!</h3>
                    <p className="text-gray-500">Great job staying on top of your tasks.</p>
                    <Link
                        to="/tasks"
                        className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        View All Tasks
                    </Link>
                </div>
            )}

            {!loading && !error && overdueTasks.length > 0 && (
                <div className="space-y-3">
                    {overdueTasks.map((task, index) => (
                        <div
                            key={task.id || index}
                            className="group bg-white shadow-sm hover:shadow-md rounded-lg border border-red-200 hover:border-red-300 transition-all duration-200 overflow-hidden"
                            title={task.description}
                        >
                            <div className="bg-red-50 px-4 py-2 border-b border-red-100">
                                <span className="text-sm font-medium text-red-600">
                                    Overdue
                                </span>
                            </div>
                            <div className="p-4">
                                <TaskCard
                                    task={task}
                                    handleDeleteTask={handleDeleteTask}
                                    handleUpdateTaskStatus={handleUpdateTaskStatus}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OverDueTasks;