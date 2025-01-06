import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'

import { navigateBack } from "../../utils/navigation"

import { Form, Col, Row, InputGroup } from "react-bootstrap"
import { PasswordUpdateBackground } from '../../styledComponents/styledLayouts'
import { EditButton } from '../../styledComponents/buttons'
import "./UserEditPass.scss"

const API = import.meta.env.VITE_API_URL

export default function UserEditPass({ setCurrentUser, currentUser }) {
    const [passwords, setPasswords] = useState({
        password: "",
        newPassword: "",
        confirmPassword: "",
    })
    const navigate = useNavigate()
    const editUser = () => {
        const token = localStorage.getItem('authToken')
        fetch(`${API}/accounts/${currentUser.account_id}/password`, {
            method: "PUT",
            body: JSON.stringify({
                password: passwords.password,
                newPassword: passwords.newPassword
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then((data) => {
                if (data?.error) {
                    throw new Error(data?.error)
                }
                else if (data.err) {
                    throw new Error(data?.err)
                }
                else {
                    Swal.fire({
                        text: `User ${data?.username} successfully updated`,
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#07a'
                    }).then(() => {
                        setCurrentUser(data)
                        navigate(`/users/${data?.account_id}/profile`)
                    })
                }
            })
            .catch((error) => {
                Swal.fire({
                    text: error?.message,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#07a'
                })
                console.error(error)
            })
    }

    const handlePasswordChange = (e) => {
        const { name, value } = e.target

        setPasswords(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (passwords.newPassword !== passwords.confirmPassword) {
            Swal.fire({
                text: 'New password and confirm password do not match.',
                confirmButtonText: 'OK',
                confirmButtonColor: '#07a'
            })
        } else {
            editUser()
        }
    }

    const handleBack = () => navigateBack(navigate)

    return (
        <div className="form-password-edit">
            <PasswordUpdateBackground >

                <Form className="form" noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="password" className="mb-3__group">
                            <InputGroup>
                                <InputGroup.Text className="mb-3__group__icon">
                                    <i className="bi bi-shield-lock-fill"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    className="mb-3__group__input"
                                    required
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                    value={passwords.password}
                                    onChange={handlePasswordChange}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="newPassword" className="mb-3__group">
                            <InputGroup>
                                <InputGroup.Text className="mb-3__group__icon">
                                    <i className="bi bi-shield-lock"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    className="mb-3__group__input"
                                    name="newPassword"
                                    type="password"
                                    placeholder="new password"
                                    value={passwords.newPassword}
                                    onChange={handlePasswordChange}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="confirmPassword" className="mb-3__group">
                            <InputGroup>
                                <InputGroup.Text className="mb-3__group__icon">
                                    <i className="bi bi-shield-lock"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    className="mb-3__group__input"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="confirm new password"
                                    value={passwords.confirmPassword}
                                    onChange={handlePasswordChange}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <br></br>
                    <div className="button-container">
                        <EditButton type="submit">
                            Update Password
                        </EditButton>
                        <EditButton onClick={handleBack} type="button"  >
                            Back
                        </EditButton>
                    </div>
                </Form>
            </PasswordUpdateBackground>
        </div>
    )
}