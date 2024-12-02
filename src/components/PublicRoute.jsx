
import {
    Navigate
} from 'react-router-dom'

const PublicRoute = ({
    element: Component,
    currentUser,
    setCurrentUser }) => {

    const token = localStorage.getItem('authToken')

    return !token ?
        <Component
            setCurrentUser={setCurrentUser}
            currentUser={currentUser} />
        :
        <Navigate to={`/users/${currentUser?.account_id}/profile`} />
}

export default PublicRoute
