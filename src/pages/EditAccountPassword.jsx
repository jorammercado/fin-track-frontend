import UserEditPass from '../components/user/UserEditPass'

const EditAccountPassword = ({ setCurrentUser, currentUser }) => {
    return (
        <div>
            <UserEditPass
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
            />
        </div>
    )
}

export default EditAccountPassword