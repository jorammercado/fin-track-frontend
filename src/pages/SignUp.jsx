import React from 'react'
import SignUpForm from "../components/SignUpForm"

const SignUp = ({ setCurrentUser }) => {
    return (
        <div>
            <SignUpForm setCurrentUser={setCurrentUser} />
        </div>
    )
}

export default SignUp
