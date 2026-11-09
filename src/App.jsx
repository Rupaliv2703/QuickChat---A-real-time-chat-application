import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import Login from './pages/Login'
import chatbg from './assets/chatbg.png'
import { Toaster } from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'

const App = () => {
  const { authUser, loading } = useContext(AuthContext);

  return (
    <div
      className="bg-cover"
      style={{ backgroundImage: `url(${chatbg})` }}
    >
      <Toaster />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />

          <Route
            path="/about"
            element={authUser ? <About /> : <Navigate to="/login" />}
          />

          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/login" />}
          />

          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
      )}
    </div>
  )
}

export default App