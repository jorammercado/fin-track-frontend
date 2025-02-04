import { useState, useRef, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import Swal from 'sweetalert2'

import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import VerifyOTP from './pages/VerifyOTP'
import FourOFour from './pages/FourOFour'
import Profile from './pages/Profile'
import EditAccount from './pages/EditAccount'
import EditAccountPassword from './pages/EditAccountPassword'
import Dashboard from './pages/Dashboard'
import Ivestments from './pages/Investments'
import MarketNews from './pages/MarketNews'
import Transactions from './pages/Transactions'
import TransactionsAdd from './pages/TransactionsAdd'
import TransactionsEdit from './pages/TransactionsEdit'
import UnderConstruction from './pages/UnderConstruction'

import PublicRoute from './routes/PublicRoute'
import ProtectedRoute from './routes/ProtectedRoute'

import NavBar from './layout/NavBar'
import Footer from './layout/Footer'

import { handleLogin as loginHandler, handleLogout as logoutHandler } from './utils/auth'

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
    loginHandler(user, jwtToken, setCurrentUser, setToken, timeoutIdRef, handleLogout)
  }

  const handleLogout = (isTimeout = false) => {
    const swalOptions = logoutHandler(setCurrentUser, setToken, timeoutIdRef, isTimeout)
    Swal.fire(swalOptions)
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
    <div className="app">
      <Router>
        <div className="app__nav">
          <NavBar
            token={token}
            handleLogout={handleLogout}
            currentUser={currentUser}
          />
        </div>
        <main className="app__main">
          <Routes>
            <Route path="/"
              element={
                <PublicRoute
                  element={Home}
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
              path="/users/:account_id/profile/transactions/add"
              element={
                <ProtectedRoute
                  element={TransactionsAdd}
                  currentUser={currentUser}
                />
              }
            />

            <Route
              path="/users/:account_id/profile/transactions/edit"
              element={
                <ProtectedRoute
                  element={TransactionsEdit}
                  currentUser={currentUser}
                />
              }
            />

            <Route
              path="/users/:account_id/profile/transactions"
              element={
                <ProtectedRoute
                  element={Transactions}
                  currentUser={currentUser}
                />
              }
            />

            <Route
              path="/users/:account_id/profile/investments"
              element={
                <ProtectedRoute
                  element={Ivestments}
                />
              }
            />

            <Route
              path="/users/:account_id/profile/marketnews"
              element={
                <ProtectedRoute
                  element={MarketNews}
                />
              }
            />

            <Route
              path="/users/:account_id/profile/dashboard"
              element={
                <ProtectedRoute
                  element={Dashboard}
                  currentUser={currentUser}
                />
              }
            />

            <Route
              path="/users/:account_id/profile/edit"
              element={
                <ProtectedRoute
                  element={EditAccount}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            <Route
              path="/users/:account_id/profile/password"
              element={
                <ProtectedRoute
                  element={EditAccountPassword}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            <Route
              path="/users/:account_id/profile"
              element={
                <ProtectedRoute
                  element={Profile}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  setToken={setToken}
                  handleLogout={handleLogout}
                />
              }
            />

            <Route
              path="/construction"
              element={
                <ProtectedRoute
                  element={UnderConstruction}
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