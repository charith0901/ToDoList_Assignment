import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ProtectedRoute from './components/common/ProtectedRoute'
import Dashboard from './components/dashboard';
import TaskManager from './components/task/index';
import OverView from './components/dashboard/overView';
import Profile from './components/dashboard/profile';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';

function App() {

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword/>}/>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}
          >
            <Route element={<Dashboard />}>
              <Route path='/dashboard' element={<OverView />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/tasks' element={<TaskManager />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
