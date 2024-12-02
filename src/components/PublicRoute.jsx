
import {
    Navigate, useLocation
} from 'react-router-dom'

const PublicRoute = ({
    element: Component,
    currentUser,
    setCurrentUser }) => {

    const token = localStorage.getItem('authToken')
    const location = useLocation()

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
