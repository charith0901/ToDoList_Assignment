import { useState, useEffect } from 'react';
import {  getTasks, deleteTask, updateTaskStatus } from '../../services/taskService';
import { CheckSquare, Pencil, Trash } from 'lucide-react';
import CreateTask from './create';
import UpdateTask from './update';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [isOpenUpdatePanel, setIsOpenUpdatePanel] = useState(false);
    const [sortOrder, setSortOrder] = useState('desc');
   
    useEffect(() => {
        loadTasks();
    }, []); 
    const loadTasks = async () => {
        setLoading(true);
        try {
            const data = await getTasks();
            setTasks(data.tasks || data);
        } catch (err) {
            console.error('Error loading tasks:', err);
        } finally {
            setLoading(false);
        }
    };
    const handleEdit = (task) => {
        setEditingTask(task);
        setIsOpenUpdatePanel(true);
    };
    const handleDelete = async (taskId) => {
        if (!window.confirm('Are you sure you want to delete this task?')) {
            return;
        }

        setLoading(true);
        try {
            await deleteTask(taskId);
            loadTasks();
        } catch (err) {
            console.error('Error deleting task:', err);
        } finally {
            setLoading(false);
        }
    }; 
    const handleToggleComplete = async (task) => {
        setLoading(true);
        try {
            await updateTaskStatus(task._id);
            loadTasks();
        } catch (err) {
            console.error('Error updating task:', err);
        } finally {
            setLoading(false);
        }
    };

    // Sort tasks by due date
    const sortTasksByDueDate = (tasks) => {
        return [...tasks].sort((a, b) => {
            if (!a.dueDate && !b.dueDate) return 0;
            if (!a.dueDate) return 1; // Tasks without due date go to bottom
            if (!b.dueDate) return -1;

            const dateA = new Date(a.dueDate);
            const dateB = new Date(b.dueDate);

            if (sortOrder === 'asc') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'No due date';
        const date = new Date(dateString);
        return date.toLocaleString();
    }; const sortedTasks = sortTasksByDueDate(tasks);
    const handleUpdateTaskSuccess = () => {
        setIsOpenUpdatePanel(false);
        setEditingTask(null);
        loadTasks();
    };

    const handleUpdateTaskCancel = () => {
        setIsOpenUpdatePanel(false);
        setEditingTask(null);
    }; return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Main Content */}
                <div className={`${isOpenUpdatePanel ? 'lg:w-2/3' : 'w-full'} transition-all duration-300`}>            <div className="flex items-center justify-between mb-6">
                    {!showAddForm && (
                        <button
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                            onClick={() => setShowAddForm(!showAddForm)}
                            disabled={loading}
                        >
                            + Add Task
                        </button>
                    )}
                </div>

                    {/* Add/Edit Task Form */}
                    {showAddForm && (
                        <CreateTask onClose={() => { setShowAddForm(false);loadTasks(); }} />
                    )}



                    {/* Loading State */}
                    {loading && (
                        <div className="flex justify-center items-center py-8">
                            <span className="text-blue-600 font-semibold">Loading...</span>
                        </div>
                    )}            {/* Tasks List */}
                    <div>                {/* Sorting Controls */}
                        {tasks.length > 0 && (
                            <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2">
                                <span className="text-gray-700 font-medium">Sort by Due Date:</span>
                                <button
                                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 transition w-fit"
                                >
                                    {sortOrder === 'asc' ? '↑ Earliest First' : '↓ Latest First'}
                                </button>
                            </div>
                        )}

                        {/* Tasks Table */}
                        {tasks.length > 0 && (
                            <div className="mb-8 -mx-4 sm:mx-0 overflow-x-auto">
                                <div className="min-w-full inline-block align-middle">
                                    <table className="min-w-full bg-white rounded-lg shadow">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Task
                                                </th>
                                                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                                    Description
                                                </th>
                                                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Due Date
                                                </th>
                                                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {sortedTasks.map(task => (
                                                <tr
                                                    key={task._id}
                                                    className={`hover:bg-gray-50 cursor-pointer ${task.isCompleted ? 'opacity-60' : ''}`}
                                                    onClick={() => handleEdit(task)}
                                                >
                                                    <td className="px-3 sm:px-6 py-4">
                                                        <div className={`text-sm font-medium text-gray-900 ${task.isCompleted ? 'line-through' : ''}`}>
                                                            {task.title}
                                                        </div>
                                                        <div className={`text-sm text-gray-600 mt-1 sm:hidden ${task.isCompleted ? 'line-through' : ''}`}>
                                                            {task.description}
                                                        </div>
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-4 hidden sm:table-cell">
                                                        <div className={`text-sm text-gray-600 ${task.isCompleted ? 'line-through' : ''}`}>
                                                            {task.description}
                                                        </div>
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {formatDate(task.dueDate)}
                                                        </div>
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${task.isCompleted
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                            {task.isCompleted ? 'Completed' : 'Pending'}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex gap-1 sm:gap-2">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleToggleComplete(task);
                                                                }}
                                                                className="bg-green-100 text-green-700 p-1 sm:px-2 sm:py-1 rounded hover:bg-green-200 transition"
                                                                disabled={loading}
                                                                title={task.isCompleted ? "Mark as incomplete" : "Mark as complete"}
                                                            >
                                                                <CheckSquare className={`w-3 h-3 sm:w-4 sm:h-4 ${task.isCompleted ? 'text-green-600' : 'text-gray-600'}`} />
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleEdit(task);
                                                                }}
                                                                className="bg-blue-100 text-blue-700 p-1 sm:px-2 sm:py-1 rounded hover:bg-blue-200 transition"
                                                                disabled={loading}
                                                                title="Edit task"
                                                            >
                                                                <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleDelete(task._id);
                                                                }}
                                                                className="bg-red-100 text-red-700 p-1 sm:px-2 sm:py-1 rounded hover:bg-red-200 transition"
                                                                disabled={loading}
                                                                title="Delete task"
                                                            >
                                                                <Trash className="w-3 h-3 sm:w-4 sm:h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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
                                </button>                    </div>
                        )}
                    </div>
                </div>                {/* Update Panel */}
                {isOpenUpdatePanel && editingTask && (
                    <div className="lg:w-1/3 transition-all duration-300">
                        <UpdateTask
                            task={editingTask}
                            onSuccess={handleUpdateTaskSuccess}
                            onCancel={handleUpdateTaskCancel}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskManager;