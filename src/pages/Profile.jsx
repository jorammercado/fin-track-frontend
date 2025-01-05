import React from 'react'
import { ProfileWrapper } from '../styledComponents/styledLayouts/ProfileWrapper'
import UserInfo from '../components/user/UserInfo'

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
