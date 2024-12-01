import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import FourOFour from "./pages/FourOFour"
import SignUp from "./pages/SignUp"
import User from "./pages/User"
import VeriftOTP from "./pages/VerifyOTP"

import NavBar from './components/NavBar'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.scss'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('authToken') || null)

  return (
    <div className='app'>
      <Router>
        <div className="nav">
          <NavBar />
        </div>
        <main className="main">

        </main>
      </Router>
    </div>
  )
}

export default App
