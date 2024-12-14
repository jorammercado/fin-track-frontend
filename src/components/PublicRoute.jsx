
import {
    Navigate, useLocation
} from 'react-router-dom'
import FourOFour from '../pages/FourOFour'

const PublicRoute = ({
    element: Component,
    currentUser,
    setCurrentUser }) => {

    const token = localStorage.getItem('authToken')
    const location = useLocation()

    if (Component === FourOFour) {
        return <Component />
    }

    if (location.pathname === "/") {
        return (
            <Component
                setCurrentUser={setCurrentUser}
                currentUser={currentUser} />
        )
    }

    return !token ?
        <Component
            setCurrentUser={setCurrentUser}
            currentUser={currentUser} />
        :
        <Navigate to={`/users/${currentUser?.account_id}/profile`} />
}

export default PublicRoute
