import React from 'react'
import {
    FourOFourButton
} from '../styles/buttons/FourOFourButton'
import { Link } from "react-router-dom"
import "./FourOFour.scss"

const FourOFour = () => {
    return (
        <div className="error d-flex justify-content-center align-items-center min-vh-50 ">
            <div className="error__content text-center">
                <div className="error__code display-1 fw-bold text-dark">404</div>
                <p className="error__message fs-4 text-secondary">Oops! The page you're looking for cannot be found.</p>
                <div className="error__button">
                    <Link to="/" replace> <FourOFourButton>Go Back Home</FourOFourButton></Link>
                </div>
            </div>
        </div>
    )
}

export default FourOFour
