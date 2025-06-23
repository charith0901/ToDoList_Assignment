import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    CheckSquare,
    Clock,
    FileText,
    Plus,
    Eye,
    Download,
    Calendar,
    AlertCircle,
} from "lucide-react";
import { overViewTasks, updateTaskStatus, deleteTask } from "../../services/taskService";
import CreateTask from "../task/create";
import StatCard from "../common/StatCard";
import TaskCard from "../common/TaskCard";

const OverView = () => {
    const [overviewTasks, setOverviewTasks] = useState({
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        overdueTasks: [],
        todayTasks: []
    });
    const [showCreateTask, setShowCreateTask] = useState(false);

    const fetchOverviewTasks = async () => {
        try {
            const data = await overViewTasks();
            setOverviewTasks(data);
        } catch (error) {
            console.error("Error fetching overview tasks:", error);
        }
    };

    useEffect(() => {
        fetchOverviewTasks();
    }, []);

    const completionRate = overviewTasks.totalTasks > 0
        ? Math.round((overviewTasks.completedTasks / overviewTasks.totalTasks) * 100)
        : 0;

    const handleUpdateTaskStatus = async (taskId) => {
        try {
            await updateTaskStatus(taskId);
            fetchOverviewTasks();
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    }
    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId)
            fetchOverviewTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }



    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={FileText}
                        title="Total Tasks"
                        value={overviewTasks.totalTasks}
                        color="text-blue-600"
                        bgColor="bg-blue-100"
                        textColor="text-gray-900"
                    />
                    <StatCard
                        icon={CheckSquare}
                        title="Completed"
                        value={overviewTasks.completedTasks}
                        color="text-green-600"
                        bgColor="bg-green-100"
                        textColor="text-green-700"
                    />
                    <StatCard
                        icon={Clock}
                        title="In Progress"
                        value={overviewTasks.pendingTasks}
                        color="text-orange-600"
                        bgColor="bg-orange-100"
                        textColor="text-orange-700"
                    />
                    <StatCard
                        icon={AlertCircle}
                        title="Completion Rate"
                        value={`${completionRate}%`}
                        color="text-purple-600"
                        bgColor="bg-purple-100"
                        textColor="text-purple-700"
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Today's Tasks */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                                <div className="flex items-center space-x-3">
                                    <Calendar className="w-6 h-6 text-white" />
                                    <h3 className="text-xl font-semibold text-white">Today's Tasks</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                {overviewTasks.todayTasks.length > 0 ? (
                                    <div className="space-y-4">
                                        {overviewTasks.todayTasks.map((task, index) => (
                                            <div
                                                key={index}
                                                className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors duration-200 border border-transparent hover:border-blue-200"
                                            >
                                                <TaskCard
                                                    task={task}
                                                    handleDeleteTask={handleDeleteTask}
                                                    handleUpdateTaskStatus={handleUpdateTaskStatus}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500 text-lg">No tasks scheduled for today</p>
                                        <p className="text-gray-400 text-sm mt-2">Take a well-deserved break!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <Plus className="w-6 h-6 mr-3 text-blue-600" />
                                Quick Actions
                            </h3>
                            <div className="space-y-4">
                                <Link to="/tasks"
                                    className="w-full group flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
                                >
                                    <Eye className="w-5 h-5 mr-2" />
                                    View All Tasks
                                </Link>

                                <button
                                    className="w-full group flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
                                    onClick={() => setShowCreateTask(true)}
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Create New Task
                                </button>
                                {showCreateTask && (
                                    <CreateTask onClose={() => {setShowCreateTask(false);fetchOverviewTasks();}} />
                                )}

                                <button
                                    onClick={() => {/* Export functionality */ }}
                                    className="w-full group flex items-center justify-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
                                >
                                    <Download className="w-5 h-5 mr-2" />
                                    Export Data
                                </button>
                            </div>
                        </div>

                        {/* Overdue Tasks Alert */}
                        {overviewTasks.overdueTasks.length > 0 && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                                <div className="flex items-center mb-4">
                                    <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
                                    <h3 className="text-lg font-semibold text-red-800">
                                        Overdue Tasks ({overviewTasks.overdueTasks.length})
                                    </h3>
                                </div>
                                <p className="text-red-700 text-sm">
                                    You have {overviewTasks.overdueTasks.length} overdue task{overviewTasks.overdueTasks.length !== 1 ? 's' : ''} that need attention.
                                </p>
                                <Link
                                    to="/overdue-tasks"
                                    className="inline-flex items-center mt-3 text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
                                >
                                    View overdue tasks →
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default OverView;