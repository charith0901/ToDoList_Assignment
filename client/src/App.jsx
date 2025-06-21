import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ProtectedRoute from './components/common/ProtectedRoute'

function App() {

  return (
    <>
    <Toaster/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}
        >
          <Route path='/dashboard' element={<h1>Dashboard</h1>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
