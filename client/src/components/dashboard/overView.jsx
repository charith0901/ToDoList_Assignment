import { Link } from "react-router-dom";

const OverView = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">📝</span>
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                        <p className="text-2xl font-bold text-gray-900">12</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">✅</span>
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Completed</p>
                        <p className="text-2xl font-bold text-gray-900">8</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🔄</span>
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">In Progress</p>
                        <p className="text-2xl font-bold text-gray-900">4</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="md:col-span-2 lg:col-span-3">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            to="/tasks"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            View All Tasks
                        </Link>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
                            Create New Task
                        </button>
                        <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                            Export Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default OverView;
