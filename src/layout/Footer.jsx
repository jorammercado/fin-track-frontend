import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import './Footer.scss'

const Footer = () => {
    return (
        <footer className="footer text-white py-4">
            <p className="footer__text">&copy; 2024 Financial Insights and Tracking Application. All rights reserved.</p>
            <div className="footer__social-links">
                <a href="https://github.com/jorammercado/fin-track-frontend" target="_blank" rel="noopener noreferrer" className="footer__social-links__link">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="https://www.linkedin.com/in/jorammercado" target="_blank" rel="noopener noreferrer" className="footer__social-links__link">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
            </div>
        </footer>
    )
}

export default Footer