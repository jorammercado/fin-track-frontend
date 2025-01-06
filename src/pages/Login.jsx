import { useState } from 'react'
import { useNavigate } from "react-router-dom"

import axios from 'axios'
import Swal from 'sweetalert2'

import SpinnerSmall from '../components/common/SpinnerSmall'
import { validatesEmail, validatesPassword } from '../utils/validation'

import { FormInput, LoginForm } from '../styledComponents/forms'
import { ErrorList, LoginHeader } from '../styledComponents/text'
import { HeaderWrapper } from '../styledComponents/styledLayouts'
import { LoginButton, OkButton } from '../styledComponents/buttons'
import "./Login.scss"

const VITE_API_URL = import.meta.env.VITE_API_URL

const Login = ({ setCurrentUser }) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const emailErrors = validatesEmail(email)
        const passwordErrors = validatesPassword(password)

        if (emailErrors.length || passwordErrors.length) {
            setErrors([...emailErrors, ...passwordErrors])
            return
        }
        setLoading(true)
        try {
            const res = await axios.post(`${VITE_API_URL}/accounts/login-initiate`, {
                email,
                password
            })
            setLoading(false)
            if (res?.data?.error)
                throw new Error(res?.data?.error)
            if (res?.data?.err)
                throw new Error(res?.data?.err)
            Swal.fire({
                text: `OTP has been sent to your email. Please verify to continue.`,
                confirmButtonText: 'OK',
                confirmButtonColor: '#07a'
            }).then(() => {
                setErrors([])
                navigate(`/users/${res.data.account_id}/verify-otp-login`)
            })
        } catch (err) {
            setLoading(false)
            console.error(err?.response?.data?.error)
            processLoginErrors(err?.response?.data?.error)
        }
        setLoading(false)
    }

    const processLoginErrors = (serverRes) => {
        if (!serverRes) {
            setErrors(['An unexpected error occurred. Please try again.'])
        } else {
            setErrors([`Server response: ${serverRes}`])
        }
    }

    const handleOk = (event) => {
        event.preventDefault()
        setEmail("")
        setPassword("")
        setErrors([])
    }

    const guestLogin = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post(`${VITE_API_URL}/accounts/guest-login`)
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
                setCurrentUser(res.data.guestAccount, res.data.token)
                navigate(`/users/${res.data.guestAccount.account_id}/profile`)
            })
        } catch (err) {
            setLoading(false)
            console.error(err)
            Swal.fire({
                text: `Unable to login as guest. Redirecting to sign up page...`,
                confirmButtonText: 'OK',
                confirmButtonColor: '#07a'
            }).then(() => {
                navigate(`/signup`)
            })
        }
    }

    return (
        <div className="login">
            <LoginForm onSubmit={handleSubmit}>
                {
                    loading ? <SpinnerSmall /> :
                        !errors.length ?
                            <>
                                <HeaderWrapper>
                                    <LoginHeader>Login to Your Account</LoginHeader>
                                </HeaderWrapper>
                                <FormInput type="text" value={email} onChange={e => setEmail(e.currentTarget.value)} placeholder="Email" />
                                <FormInput type="password" value={password} onChange={e => setPassword(e.currentTarget.value)} placeholder="Password" />
                                <LoginButton type="submit" >{'Sign In'}</LoginButton>
                                <button className="guest-login" type="button" onClick={guestLogin}> Continue as Guest </button>
                            </> :
                            <>
                                <ErrorList>
                                    {errors.length > 0 ? errors.map((error, i) => <li key={`${i}`}>&nbsp;{error}</li>) : ""}
                                </ErrorList>
                                <OkButton onClick={handleOk}>
                                    OK
                                </OkButton>
                            </>
                }
            </LoginForm>
        </div>
    )
}

export default Login