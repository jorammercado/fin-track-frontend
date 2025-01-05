export const handleInputChange = (event, state, setState) => {
    const { name, value, type, checked } = event.target
    setState({
        ...state,
        [name]: type === "checkbox" ? checked : value,
    })
}