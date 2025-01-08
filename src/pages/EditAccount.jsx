import UserEdit from '../components/user/UserEdit'

const EditAccount = ({ setCurrentUser, currentUser }) => {
    return (
        <div>
            <UserEdit
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
            />
        </div>
    )
}

export default EditAccount