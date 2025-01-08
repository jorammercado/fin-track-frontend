export const handleInputChange = (event, state, setState, setConfirmPassword = null) => {
    const { name, value, type, checked } = event.target
    setState({
        ...state,
        [name]: type === 'checkbox' ? checked : value,
    })
    if (name === 'confirm-password') {
        setConfirmPassword(value)
    }
}