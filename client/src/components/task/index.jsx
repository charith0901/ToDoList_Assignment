import React, { useState, useEffect } from 'react';
import { createTask, getTasks, updateTask, deleteTask } from '../../services/taskService';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    useEffect(() => {
        loadTasks();
    }, []);

    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError('');
                setSuccess('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    const loadTasks = async () => {
        setLoading(true);
        try {
            const data = await getTasks();
            setTasks(data.tasks || data);
            setError('');
        } catch (err) {
            setError('Failed to load tasks. Please try again.');
            console.error('Error loading tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.description.trim()) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            if (editingTask) {
                await updateTask(editingTask._id, formData);
                setSuccess('Task updated successfully!');
            } else {
                await createTask(formData);
                setSuccess('Task created successfully!');
            }
            setFormData({ title: '', description: '' });
            setShowAddForm(false);
            setEditingTask(null);
            loadTasks();
            setError('');
        } catch (err) {
            setError(editingTask ? 'Failed to update task' : 'Failed to create task');
            console.error('Error saving task:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setFormData({
            title: task.title,
            description: task.description
        });
        setShowAddForm(true);
    };

    const handleDelete = async (taskId) => {
        if (!window.confirm('Are you sure you want to delete this task?')) {
            return;
        }

        setLoading(true);
        try {
            await deleteTask(taskId);
            setSuccess('Task deleted successfully!');
            loadTasks();
            setError('');
        } catch (err) {
            setError('Failed to delete task');
            console.error('Error deleting task:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleComplete = async (task) => {
        setLoading(true);
        try {
            await updateTask(task._id, { ...task, completed: !task.completed });
            setSuccess(`Task marked as ${!task.completed ? 'completed' : 'incomplete'}!`);
            loadTasks();
            setError('');
        } catch (err) {
            setError('Failed to update task status');
            console.error('Error updating task:', err);
        } finally {
            setLoading(false);
        }
    };

    const cancelEdit = () => {
        setEditingTask(null);
        setFormData({ title: '', description: '' });
        setShowAddForm(false);
    };

    const completedTasks = tasks.filter(task => task.completed);
    const incompleteTasks = tasks.filter(task => !task.completed);

    return (
        <div className="max-w-3xl mx-auto p-4">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    onClick={() => setShowAddForm(!showAddForm)}
                    disabled={loading}
                >
                    {showAddForm ? 'Cancel' : '+ Add Task'}
                </button>
            </div>

            {/* Messages */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-300">
                    {error}
                </div>
            )}
            {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded border border-green-300">
                    {success}
                </div>
            )}

            {/* Add/Edit Task Form */}
            {showAddForm && (
                <div className="mb-6 bg-white rounded shadow p-6">
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-xl font-semibold mb-4">{editingTask ? 'Edit Task' : 'Add New Task'}</h3>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Task title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                                disabled={loading}
                            />
                        </div>
                        <div className="mb-4">
                            <textarea
                                placeholder="Task description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                                rows="3"
                                disabled={loading}
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : (editingTask ? 'Update Task' : 'Create Task')}
                            </button>
                            <button
                                type="button"
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                                onClick={cancelEdit}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Task Statistics */}
            <div className="flex gap-4 mb-6">
                <div className="flex-1 bg-gray-100 rounded p-4 text-center">
                    <span className="block text-2xl font-bold">{tasks.length}</span>
                    <span className="text-gray-600">Total Tasks</span>
                </div>
                <div className="flex-1 bg-yellow-100 rounded p-4 text-center">
                    <span className="block text-2xl font-bold">{incompleteTasks.length}</span>
                    <span className="text-yellow-700">Pending</span>
                </div>
                <div className="flex-1 bg-green-100 rounded p-4 text-center">
                    <span className="block text-2xl font-bold">{completedTasks.length}</span>
                    <span className="text-green-700">Completed</span>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center py-8">
                    <span className="text-blue-600 font-semibold">Loading...</span>
                </div>
            )}

            {/* Tasks List */}
            <div>
                {/* Incomplete Tasks */}
                {incompleteTasks.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-3 text-yellow-700">
                            Pending Tasks ({incompleteTasks.length})
                        </h2>
                        <div className="grid gap-4">
                            {incompleteTasks.map(task => (
                                <div key={task._id} className="bg-white rounded shadow p-4 flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg">{task.title}</h3>
                                        <p className="text-gray-600">{task.description}</p>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => handleToggleComplete(task)}
                                            className="bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition"
                                            disabled={loading}
                                            title="Mark as complete"
                                        >
                                            ✓
                                        </button>
                                        <button
                                            onClick={() => handleEdit(task)}
                                            className="bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition"
                                            disabled={loading}
                                            title="Edit task"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleDelete(task._id)}
                                            className="bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition"
                                            disabled={loading}
                                            title="Delete task"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Completed Tasks */}
                {completedTasks.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-3 text-green-700">
                            Completed Tasks ({completedTasks.length})
                        </h2>
                        <div className="grid gap-4">
                            {completedTasks.map(task => (
                                <div key={task._id} className="bg-gray-50 rounded shadow p-4 flex justify-between items-start opacity-70">
                                    <div>
                                        <h3 className="font-bold text-lg line-through">{task.title}</h3>
                                        <p className="text-gray-500 line-through">{task.description}</p>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => handleToggleComplete(task)}
                                            className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-200 transition"
                                            disabled={loading}
                                            title="Mark as incomplete"
                                        >
                                            ↩️
                                        </button>
                                        <button
                                            onClick={() => handleDelete(task._id)}
                                            className="bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition"
                                            disabled={loading}
                                            title="Delete task"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {tasks.length === 0 && !loading && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="text-5xl mb-4">📝</div>
                        <h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
                        <p className="text-gray-500 mb-4">Create your first task to get started!</p>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            onClick={() => setShowAddForm(true)}
                        >
                            Add Your First Task
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskManager;