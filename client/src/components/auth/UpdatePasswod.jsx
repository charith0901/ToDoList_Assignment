import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { updatePassword } from "../../services/authService";

const UpdatePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("All fields are required.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }
        updatePassword(currentPassword, newPassword)
        setSuccess("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-6 text-center">Update Password</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-1 font-medium">Current Password</label>
                    <div className="relative">
                        <input
                            type={showCurrent ? "text" : "password"}
                            className="w-full border rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Enter current password"
                        />
                        <span
                            className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                            onClick={() => setShowCurrent((v) => !v)}
                        >
                            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                    </div>
                </div>
                <div>
                    <label className="block mb-1 font-medium">New Password</label>
                    <div className="relative">
                        <input
                            type={showNew ? "text" : "password"}
                            className="w-full border rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                        />
                        <span
                            className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                            onClick={() => setShowNew((v) => !v)}
                        >
                            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                    </div>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Confirm New Password</label>
                    <div className="relative">
                        <input
                            type={showConfirm ? "text" : "password"}
                            className="w-full border rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                        />
                        <span
                            className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                            onClick={() => setShowConfirm((v) => !v)}
                        >
                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                    </div>
                </div>
                {error && (
                    <div className="text-red-600 text-sm">{error}</div>
                )}
                {success && (
                    <div className="text-green-600 text-sm">{success}</div>
                )}
                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    <Lock size={18} />
                    Update Password
                </button>
            </form>
        </div>
    );
};

export default UpdatePassword;