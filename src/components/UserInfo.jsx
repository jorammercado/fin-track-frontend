import { useNavigate, Link } from "react-router-dom"
import "./UserInfo.scss"
import {
    ProfileButton
} from '../styles/styledComponents'
import Swal from 'sweetalert2'

const API = import.meta.env.VITE_API_URL

const UserInfo = ({ currentUser, setCurrentUser, setToken, handleLogout }) => {
    const navigate = useNavigate()

    const handleDelete = () => {
        const token = localStorage.getItem('authToken')
        const httpOptions = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        fetch(`${API}/accounts/${currentUser.account_id}`, httpOptions)
            .then((res) => res.json())
            .then(data => {
                if (data?.error)
                    throw new Error(data?.error)
                else if (data?.err)
                    throw new Error(data?.err)
                else {
                    Swal.fire({
                        text: 'Your account has been deleted!',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#07a'
                    }).then(() => {
                        localStorage.removeItem('authToken')
                        localStorage.removeItem('currentUser')
                        setCurrentUser(null)
                        setToken(null)
                        navigate("/login")
                    })
                }
            })
            .catch((error) => {
                console.error(error)
                Swal.fire({
                    text: 'Guest account cannot be deleted!',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#07a'
                }).then(() => {
                    navigate("/")
                })
            })
    }

    return (
        <div >
            <article className="user">
                <table className="table user__table table-bordered table-responsive table-hover table-dark table-striped">
                    <tbody>

                        <tr >
                            <th colSpan="4" className="user__table__odd">
                                <div className="user__table__row-content">
                                    <span className="user__table__row-content__label">Full Name:</span>
                                    <span className="user__table__row-content__value">{currentUser?.firstname} {currentUser?.lastname}</span>
                                </div>
                            </th>
                        </tr>
                        <tr >
                            <th colSpan="4" className="user__table__even">
                                <div className="user__table__row-content">
                                    <span className="user__table__row-content__label">Email:</span>
                                    <span className="user__table__row-content__value">{currentUser?.email}</span>
                                </div>
                            </th>
                        </tr>
                        <tr >
                            <th colSpan="4" className="user__table__odd">
                                <div className="user__table__row-content">
                                    <span className="user__table__row-content__label">Username:</span>
                                    <span className="user__table__row-content__value">{currentUser?.username}</span>
                                </div>
                            </th>
                        </tr>
                        <tr > 
                            <th colSpan="4" className="user__table__even">
                                <div className="user__table__row-content">
                                    <span className="user__table__row-content__label">DOB:</span>
                                    <span className="user__table__row-content__value">{currentUser?.dob}</span>
                                </div>
                            </th>
                        </tr>
                        <tr >
                            <th colSpan="4" className="user__table__odd">
                                <div className="user__table__row-content">
                                    <span className="user__table__row-content__label">Member Since:</span>
                                    <span className="user__table__row-content__value">{currentUser?.registration_date.split("T")[0]}</span>
                                </div>
                            </th>
                        </tr>
                    </tbody>
                </table>
                <div className="show-navigation">
                    <ProfileButton onClick={() => { navigate(`/users/${currentUser?.user_id}/profile/edit`) }}>
                        edit
                    </ProfileButton>
                    <ProfileButton onClick={() => { navigate(`/users/${currentUser?.user_id}/profile/password`) }}>
                        update password
                    </ProfileButton>
                    <ProfileButton onClick={handleDelete}>
                        delete account
                    </ProfileButton>
                    <ProfileButton onClick={() => handleLogout(false)}>
                        logout
                    </ProfileButton>
                </div>
                <br></br>
            </article>
        </div>
    )
}
export default UserInfo