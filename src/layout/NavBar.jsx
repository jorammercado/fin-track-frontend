import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"

import useScreenWidth from '../hooks/useScreenWidth'
import logo from "../assets/images/icapital-logo-full-name.svg"
import "./NavBar.scss"

export default function NavBar({ token, handleLogout, currentUser }) {
    const navigate = useNavigate()
    const screenWidth = useScreenWidth()

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">

                <div className="navbar__logo">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="navbar__logo__image" />
                        <span className="navbar__logo__text">{screenWidth > 610 ? " - Budgeter" : "Budgeter"}</span>
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
                            onClick={() => navigate(`/users/${currentUser.account_id}/profile/dashboard`)}
                        >
                            Dashboard
                        </button>
                        <button
                            className="navbar__link"
                            onClick={() => navigate(`/users/${currentUser.account_id}/profile/transactions`)}
                        >
                            Transactions
                        </button>
                        <button
                            className="navbar__link"
                            onClick={() => navigate(`/users/${currentUser.account_id}/profile/marketnews`)}
                        >
                            Market News
                        </button>
                        <button
                            className="navbar__link"
                            onClick={() => navigate(`/users/${currentUser.account_id}/profile/investments`)}
                        >
                            Investments
                        </button>
                        <button
                            className="navbar__link"
                            onClick={() => navigate(`/users/${currentUser.account_id}/profile`)}
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