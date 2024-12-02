import { useState, useRef, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import axios from 'axios'
import { jwtDecode } from "jwt-decode"
import Swal from 'sweetalert2'

import Login from "./pages/Login"
import Home from "./pages/Home"
import FourOFour from "./pages/FourOFour"
import SignUp from "./pages/SignUp"
import User from "./pages/User"
import VerifyOTP from "./pages/VerifyOTP"
import UserEdit from "./components/UserEdit"
import UserPasswordEdit from './components/UserPasswordEdit'

import PublicRoute from "./components/PublicRoute"
import ProtectedRoute from "./components/ProtectedRoute"

import NavBar from './components/NavBar'
import Footer from './components/Footer'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.scss'

function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('currentUser')) || null
  )
  const [token, setToken] = useState(localStorage.getItem('authToken') || null)
  const timeoutIdRef = useRef(null)

  const handleLogin = (user, jwtToken) => {
    setCurrentUser(user)
    localStorage.setItem('currentUser', JSON.stringify(user))
    setToken(jwtToken)
    localStorage.setItem('authToken', jwtToken)

    try {
      const { exp } = jwtDecode(jwtToken)
      const expirationTime = exp * 1000 - Date.now()

      timeoutIdRef.current = setTimeout(() => {
        handleLogout(true)
      }, expirationTime)
    } catch (error) {
      console.error('Invalid token during login:', error)
      handleLogout(false)
    }
  }

  const handleLogout = (isTimeout = false) => {
    setCurrentUser(null)
    setToken(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('currentUser')
    clearTimeout(timeoutIdRef.current)

    if (isTimeout) {
      Swal.fire({
        text: 'Your session has timed out. Please log in again.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#07a'
      })
    } else {
      Swal.fire({
        text: 'You have been successfully logged out.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#07a'
      })
    }
  }

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const { exp } = jwtDecode(token)
      const expirationTime = exp * 1000 - Date.now()

      if (expirationTime > 0) {
        timeoutIdRef.current = setTimeout(() => {
          handleLogout(true)
        }, expirationTime)
      } else {
        handleLogout(true)
      }

    } else {
      delete axios.defaults.headers.common['Authorization']
    }

    return () => {
      clearTimeout(timeoutIdRef.current)
    }
  }, [token])

  return (
    <div className='app'>
      <Router>
        <div className="app__nav">
          <NavBar
            token={token}
            handleLogout={handleLogout}
          />
        </div>
        <main className="app__main">
          <Routes>
            <Route path="/"
              element={
                <PublicRoute
                  element={Home}
                  currentUser={currentUser}
                  setCurrentUser={handleLogin}
                />
              }
            />

            <Route path="/signup"
              element={
                <PublicRoute
                  element={SignUp}
                  currentUser={currentUser}
                  setCurrentUser={handleLogin}
                />
              }
            />

            <Route path="/login"
              element={
                <PublicRoute
                  element={Login}
                  currentUser={currentUser}
                  setCurrentUser={handleLogin}
                />
              }
            />

            <Route
              path="/users/:account_id/verify-otp-login"
              element={
                <PublicRoute
                  element={VerifyOTP}
                  currentUser={currentUser}
                  setCurrentUser={handleLogin}
                />
              }
            />

            <Route
              path="/users/:account_id/profile/edit"
              element={
                <ProtectedRoute
                  element={UserEdit}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            <Route
              path="/users/:account_id/profile/password"
              element={
                <ProtectedRoute
                  element={UserPasswordEdit}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            <Route
              path="/users/:account_id/profile"
              element={
                <ProtectedRoute
                  element={User}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  setToken={setToken}
                  handleLogout={handleLogout}
                />
              }
            />

            <Route
              path="*"
              element={
                <PublicRoute
                  element={FourOFour}
                />
              }
            />
          </Routes>
        </main>
        <div className="app__footer">
          <Footer />
        </div>
      </Router>
    </div>
  )
}

export default App
