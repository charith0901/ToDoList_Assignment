import { useState } from 'react';
import useAuthStore from '../../store/authStore';
import UpdatePassword from '../auth/UpdatePasswod';

const Profile = () => {
    const { user } = useAuthStore();
    const [showUpdatePassword, setShowUpdatePassword] = useState(false);

    return (
        <div className="max-w-4xl mx-auto p-6 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Information</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            value={user?.username || ''}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={user?.email || ''}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 cursor-not-allowed"
                            readOnly
                        />
                    </div>
                    <button
                        onClick={() => setShowUpdatePassword(!showUpdatePassword)}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Change Password?
                    </button>
                    {showUpdatePassword && (
                        <div className="mt-4">
                            <UpdatePassword />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Profile;
