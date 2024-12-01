import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.scss"
import logo from "../assets/icapital-logo-full-name.svg"

export default function NavBar({ token, setToken, handleLogout }) {
    const navigate = useNavigate()
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">

                <div className="navbar__logo">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="navbar__logo__image" />
                        <span className="navbar__logo__text">{screenWidth > 557 ? " - Budgeter" : "Budgeter"}</span>
                    </Link>
                </div>

                {!token ? (
                    <div className="navbar__links navbar__links--public">
                        <button
                            className="navbar__link"
                            onClick={() => navigate("/login")}
                        >
                            Log In
                        </button>
                        <button
                            className="navbar__link"
                            onClick={() => navigate("/signup")}
                        >
                            Sign Up
                        </button>
                    </div>
                ) : (
                    <div className="navbar__links navbar__links--private">
                        <button
                            className="navbar__link"
                            nClick={() => navigate("/accounts/:account_id/profile")}
                        >
                            Profile
                        </button>
                        <button
                            className="navbar__link"
                            onClick={() => handleLogout(false)}
                        >
                            Log Out
                        </button>
                    </div>
                )}
            </div>
        </nav>
    )
}

