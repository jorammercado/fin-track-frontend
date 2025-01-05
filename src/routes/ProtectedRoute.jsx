import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({
    element: Component,
    currentUser,
    setCurrentUser,
    setToken,
    handleLogout }) => {

    const token = localStorage.getItem('authToken')

    return token ?
        <Component
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setToken={setToken}
            handleLogout={handleLogout}
        /> :
        <Navigate to="/login" />
}

export default ProtectedRoute
