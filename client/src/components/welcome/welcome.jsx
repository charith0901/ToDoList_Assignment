import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, BarChart3 } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-green-400">ToDo App</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Organize your tasks, boost your productivity, and achieve your goals with our intuitive todo list application.
          </p>
        </header>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-6">
              Join thousands of users who have already transformed their productivity with TaskMaster.
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center mx-auto"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-gray-500">
          <p>&copy; 2024 ToDo App. All rights reserved.</p>
          <p>created by Charith Jayasankha</p>
        </footer>
      </div>
    </div>
  );
};

export default Welcome;