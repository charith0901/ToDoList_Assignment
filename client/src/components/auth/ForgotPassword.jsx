import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import { forgetPassword } from '../../services/authService';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await forgetPassword(email);
      setEmail('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-center text-3xl font-bold text-gray-900">Forgot Password</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email to receive a password reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              autoFocus
              className="mt-1 p-2 block w-full rounded-md shadow-sm  disabled:bg-gray-100"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !email}
            className={`w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              loading || !email
                ? 'bg-red-300 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            } transition`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Sending...
              </span>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>
        <div className="text-center mt-4">
          <span className='text-gray-500 text-sm'>Remembered your password 😁?</span>
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-800 text-sm underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;