import {
    Navigate
} from 'react-router-dom'

const ProtectedRoute = ({
    element: Component,
    currentUser,
    setCurrentUser,
    setToken,
    setStocks,
    stocks,
    handleLogout }) => {

    const token = localStorage.getItem('authToken')

    return token ?
        <Component
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setToken={setToken}
            handleLogout={handleLogout}
            setStocks={setStocks}
            stocks={stocks}
        /> :
        <Navigate to="/login" />
}

export default ProtectedRoute
