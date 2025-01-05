export const validateOTP = (otp) => {
    const otpErrors = []

    if (!otp.length)
        otpErrors.push('OTP is required')

    if (otp.length !== 6 || !/^[0-9]{6}$/.test(otp))
        otpErrors.push('OTP must be a 6-digit numeric code')

    return otpErrors
}