import { Link } from 'react-router-dom'

import { FourOFourButton } from '../styledComponents/buttons'
import cone from '../assets/images/cone-striped.svg'
import './UnderConstruction.scss'

const UnderConstruction = () => {
    return (
        <div className="construction d-flex justify-content-center align-items-center min-vh-50 ">
            <div className="text-center">
                <img src={cone} />
                <p className="error__message fs-4 text-secondary">Page Under Construction.</p>
                <div className="error__button">
                    <Link to="/" replace> <FourOFourButton>Go Back Home</FourOFourButton></Link>
                </div>
            </div>
        </div>
    )
}

export default UnderConstruction