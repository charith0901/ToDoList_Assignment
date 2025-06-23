import useAuthStore from "../../store/authStore"
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../services/authService";
import { useState, useEffect } from "react";
import { Menu, X, Home, CheckSquare, User, LogOut, Bell, Search } from 'lucide-react'

const Dashboard = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isSidebarOpen && !event.target.closest('.sidebar') && !event.target.closest('.menu-toggle')) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSidebarOpen]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const handleLogout = async () => {
        try {
            logout();
            navigate('/login', { replace: true });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    const sidebarItems = [
        { id: 'overview', label: 'Overview', icon: Home, link: '/dashboard' },
        { id: 'tasks', label: 'Tasks', icon: CheckSquare, link: '/tasks' },
        { id: 'profile', label: 'Profile', icon: User, link: '/profile' },
    ];

    const isActiveLink = (link) => {
        return location.pathname === link || (link === '/dashboard' && location.pathname === '/');
    };

    const getCurrentPageTitle = () => {
        const currentItem = sidebarItems.find(item => isActiveLink(item.link));
        return currentItem ? currentItem.label : 'Dashboard';
    };


    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar Overlay for Mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`sidebar fixed  inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } flex flex-col`}>

                {/* Logo/Header */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <h1 className="text-xl font-bold text-gray-800">ToDo App</h1>
                        </div>
                        <button
                            onClick={toggleSidebar}
                            className=" p-1 rounded-md hover:bg-gray-100 transition-colors"
                            aria-label="Close sidebar"
                        >
                            <X size={20} className="text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* User Info */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-800 truncate">{user?.username || 'User'}</p>
                            <p className="text-sm text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = isActiveLink(item.link);

                        return (
                            <Link
                                key={item.id}
                                to={item.link}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm border-l-4 border-blue-500'
                                    : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                                    }`}
                            >
                                <Icon
                                    size={20}
                                    className={`transition-colors ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                                        }`}
                                />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        <LogOut size={20} className="text-red-500 group-hover:text-red-600" />
                        <span className="font-medium">
                            Logout
                        </span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
                    <div className="px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={toggleSidebar}
                                    className="menu-toggle  p-2 rounded-md hover:bg-gray-100 transition-colors"
                                    aria-label="Open sidebar"
                                >
                                    <Menu size={20} className="text-gray-600" />
                                </button>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{getCurrentPageTitle()}</h2>

                                </div>
                            </div>

                            <div className="hidden sm:flex items-center space-x-4">
                                <div className="text-right">
                                    <p className="text-sm text-gray-500 mt-1">
                                        {new Date().toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="p-4 sm:p-6 lg:p-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;