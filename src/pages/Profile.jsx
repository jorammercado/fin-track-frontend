import UserInfo from '../components/user/UserInfo'
import { ProfileWrapper } from '../styledComponents/styledLayouts'

const Profile = ({ currentUser, setCurrentUser, setToken, handleLogout }) => {
    return (
        <ProfileWrapper>
            <UserInfo
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setToken={setToken}
                handleLogout={handleLogout} />
        </ProfileWrapper>
    )
}

export default Profile