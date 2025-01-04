import React from 'react'
import { Link } from "react-router-dom"
import {
    HomeButton
} from '../styles/buttons/HomeButton'
import "./Home.scss"

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section-home text-white text-center">
                <div className="container">
                    <h1 className="display-4">Take Control of Your Finances</h1>
                    <p className="lead">Track your income, manage expenses, and make smart investment decisions easily.</p>
                    <Link to="/signup"><HomeButton>Get Started Today</HomeButton></Link>
                </div>
            </section>

            {/* Feature Section */}
            <section className="feature-section-home py-5">
                <div className="container">
                    <div className="row text-center">
                        {/* Budget Tracking Feature */}
                        <div className="col-md-4">
                            <div className="card feature-card-home">
                                <div className="card-body">
                                    <i className="bi bi-wallet2 home-icon"></i>
                                    <h5 className="card-title mt-3">Budget Tracking</h5>
                                    <p className="card-text">Input income and expenses to get a clear view of your disposable income.</p>
                                </div>
                            </div>
                        </div>
                        {/* AI-Powered Investment Recommendations Feature */}
                        <div className="col-md-4">
                            <div className="card feature-card-home">
                                <div className="card-body">
                                    <i className="bi bi-graph-up-arrow home-icon"></i>
                                    <h5 className="card-title mt-3">AI Recommendations (comming soon)</h5>
                                    <p className="card-text">Receive personalized, low-risk stock recommendations based on your financial profile.</p>
                                </div>
                            </div>
                        </div>
                        {/* Projected Earnings Visualization Feature */}
                        <div className="col-md-4">
                            <div className="card feature-card-home">
                                <div className="card-body">
                                    <i className="bi bi-bar-chart-line home-icon"></i>
                                    <h5 className="card-title mt-3">Projected Earnings</h5>
                                    <p className="card-text">Visualize potential earnings over time based on your data investments.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Real-Time Stock Price Updates Section */}
            <section className="real-time-stock-section py-5">
                <div className="container">
                    <div className="text-center">
                        <h2 className="display-5">Real-Time Stock Price Updates</h2>
                        <p className="lead">Stay updated with the latest stock prices to make informed investment decisions.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
