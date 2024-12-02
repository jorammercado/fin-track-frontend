import {
    VerifyOPTBackground,
    VerifyOTPHeader,
    LoginLabel,
    BigErrorList,
    FormInput,
    VerifyOTPButton,
    OkButton
} from '../styles/styledComponents'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import "./Login.scss"
import Swal from 'sweetalert2'

const VITE_API_URL = import.meta.env.VITE_API_URL

const VerifyOTP = ({ setCurrentUser }) => {
    const navigate = useNavigate()
    const { account_id } = useParams()
    const [otp, setOtp] = useState('')
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)

    const validateOtp = () => {
        const otpErrors = []

        if (!otp.length)
            otpErrors.push('OTP is required')

        if (otp.length !== 6 || !/^[0-9]{6}$/.test(otp))
            otpErrors.push('OTP must be a 6-digit numeric code')

        return otpErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const otpErrors = validateOtp()

        if (otpErrors.length) {
            setErrors(otpErrors)
            return
        }

        setLoading(true)
        try {
            const res = await axios.post(`${VITE_API_URL}/accounts/verify-otp`, { account_id, otp })
            setLoading(false)
            if (res.data.error)
                throw new Error(res.data.error)
            if (res.data.err)
                throw new Error(res.data.err)

            Swal.fire({
                text: `Success! Redirecting to your profile...`,
                confirmButtonText: 'OK',
                confirmButtonColor: '#07a'
            }).then(() => {
                setErrors([])
                setCurrentUser(res.data.account, res.data.token)
                navigate(`/users/${account_id}/profile`)
            })
        } catch (err) {
            setLoading(false)
            console.error(err)
            Swal.fire({
                text: `Incorrect OTP! Redirecting to login page...`,
                confirmButtonText: 'OK',
                confirmButtonColor: '#07a'
            }).then(() => {
                navigate(`/login`)
            })
        }
    }

    const handleOk = (event) => {
        event.preventDefault()
        setOtp('')
        setErrors([])
    }

    return (
        <div>
            <VerifyOPTBackground onSubmit={handleSubmit}>
                {
                    loading ?
                        <div className="spinner-container">
                            <div className="loading-spinner"></div>
                        </div> :
                        !errors.length ?
                            <>
                                <LoginLabel>
                                    <VerifyOTPHeader>Verify OTP</VerifyOTPHeader>
                                </LoginLabel>
                                <FormInput type="text" value={otp} onChange={e => setOtp(e.currentTarget.value)} placeholder="Enter OTP" />
                                <VerifyOTPButton>{'Verify OTP'}</VerifyOTPButton>
                            </> :
                            <>
                                <BigErrorList>
                                    {errors.map((error, i) => <li key={i}>&nbsp;{error}</li>)}
                                </BigErrorList>
                                <OkButton onClick={handleOk}>OK</OkButton>
                            </>
                }
            </VerifyOPTBackground>
        </div>
    )
}

export default VerifyOTP
