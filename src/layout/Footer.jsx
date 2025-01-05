import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

import logo from "../assets/images/pursuit.png"
import "./Footer.scss"

const Footer = () => {
    return (
        <footer className="footer text-white py-4">
            <p className="footer__text">&copy; 2024 Budgeting and Investment Recommendation Application - Test. All rights reserved.</p>
            <div className="footer__social-links">
                <a href="https://github.com/jorammercado/icapital-budgeter-frontend" target="_blank" rel="noopener noreferrer" className="footer__social-links__link">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="https://www.pursuit.org" target="_blank" rel="noopener noreferrer" className="footer__social-links__link ">
                    <img src={logo} />
                </a>
                <a href="https://www.linkedin.com/in/jorammercado" target="_blank" rel="noopener noreferrer" className="footer__social-links__link">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
            </div>
        </footer>
    )
}

export default Footer
