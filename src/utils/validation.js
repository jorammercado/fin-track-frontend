export const validatesEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const emailErrors = []

    if (!email?.length) {
        emailErrors.push('Email is required.')
    }

    if (!emailRegex.test(email)) {
        emailErrors.push(`Invalid email format. Please enter a valid email address, e.g., example@domain.com.`)
    }

    if (email?.length < 5 || email?.length > 150) {
        emailErrors.push('Email must be between 6 and 150 characters.')
    }

    return emailErrors
}

export const validatesPassword = (password) => {
    const passwordErrors = []

    if (!password?.length) {
        passwordErrors.push('Password is required.')
    }

    return passwordErrors
}
