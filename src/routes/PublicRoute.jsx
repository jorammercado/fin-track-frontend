import { Navigate, useLocation } from 'react-router-dom'
import FourOFour from '../pages/FourOFour'

const PublicRoute = ({ element: Component, setCurrentUser, currentUser }) => {

    const token = localStorage.getItem('authToken')
    const location = useLocation()

    if (Component === FourOFour || location.pathname === '/') {
        return <Component />
    }

    return !token ?
        <Component setCurrentUser={setCurrentUser} />
        :
        <Navigate to={`/users/${currentUser?.account_id}/profile`} />
}

export default PublicRoute