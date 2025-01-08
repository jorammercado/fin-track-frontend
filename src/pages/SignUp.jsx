import SignUpForm from '../components/user/SignUpForm'

const SignUp = ({ setCurrentUser }) => {
    return (
        <div>
            <SignUpForm setCurrentUser={setCurrentUser} />
        </div>
    )
}

export default SignUp