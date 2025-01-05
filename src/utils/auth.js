import { jwtDecode } from 'jwt-decode'

export const handleLogin = (user, jwtToken, setCurrentUser, setToken, timeoutIdRef, handleLogout) => {
    setCurrentUser(user)
    localStorage.setItem('currentUser', JSON.stringify(user))
    setToken(jwtToken)
    localStorage.setItem('authToken', jwtToken)

    try {
        const { exp } = jwtDecode(jwtToken)
        const expirationTime = exp * 1000 - Date.now()

        timeoutIdRef.current = setTimeout(() => {
            handleLogout(true)
        }, expirationTime)
    } catch (error) {
        console.error('Invalid token during login:', error)
        handleLogout(false)
    }
}

export const handleLogout = (setCurrentUser, setToken, timeoutIdRef, isTimeout = false) => {
    setCurrentUser(null)
    setToken(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('currentUser')
    clearTimeout(timeoutIdRef.current)

    if (isTimeout) {
        return {
            text: 'Your session has timed out. Please log in again.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#07a'
        }
    } else {
        return {
            text: 'You have been successfully logged out.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#07a'
        }
    }
}