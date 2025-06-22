import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError('');
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      await login(formData);
      console.log('Login successful');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-center text-3xl font-bold text-gray-900">Login to ToDo App</h2>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-2 text-center animate-fade-in">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label htmlFor='emial' className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              autoFocus
              required
              disabled={loading}
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md shadow-sm  disabled:bg-gray-100"
              placeholder='you@example.com'
            />
          </div>

          <div className="mb-4">
            <label htmlFor='password' className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md shadow-sm  disabled:bg-gray-100"
              placeholder='Enter your password'
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              loading
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
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-700">Register</Link>
        </div>
        <span className="text-center block mt-2 text-sm text-gray-600">or</span>
        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-blue-500 hover:text-blue-700">Forget Password</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
