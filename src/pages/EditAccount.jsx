import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Col, Row, InputGroup } from "react-bootstrap"
import { EditBackground } from '../styles/styledComponents'
import { EditButton } from '../styles/buttons/EditButton'
import "./EditAccount.scss"
import Swal from 'sweetalert2'
const API = import.meta.env.VITE_API_URL

export default function EditAccount({ setCurrentUser, currentUser }) {
    const [user, setUser] = useState(currentUser)
    const navigate = useNavigate()
    const editUser = () => {
        const token = localStorage.getItem('authToken')
        fetch(`${API}/accounts/${currentUser.account_id}`, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then((data) => {
                if (data.error) {
                    throw new Error(data.error)
                }
                else if (data.err) {
                    throw new Error(data.err)
                }
                else {
                    Swal.fire({
                        text: `Account ${data.username} successfully updated!`,
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#07a'
                    }).then(() => {
                        setCurrentUser(data)
                        navigate(`/users/${data.account_id}/profile`)
                    })
                }
            })
            .catch((error) => {
                Swal.fire({
                    text: error.message,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#07a'
                })
                console.error(error)
            })
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setUser({
            ...user,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        editUser()
    }

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <div className="form-edit-user">
            <EditBackground >

                <Form className="form" noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="username" className="mb-3__group">
                            <InputGroup>
                                <InputGroup.Text className="mb-3__group__icon">
                                    <i className="bi bi-person-fill"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    className="mb-3__group__input"
                                    required
                                    name="username"
                                    type="text"
                                    placeholder="username"
                                    value={user.username}
                                    onChange={handleInputChange}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="email" className="mb-3__group">
                            <InputGroup>
                                <InputGroup.Text className="mb-3__group__icon">
                                    <i className="bi bi-envelope"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    className="mb-3__group__input"
                                    name="email"
                                    type="text"
                                    placeholder="@"
                                    value={user.email}
                                    onChange={handleInputChange}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="firstname" className="mb-3__group">
                            <InputGroup>
                                <InputGroup.Text className="mb-3__group__icon">
                                    <i className="small-icon" >FN</i>
                                </InputGroup.Text>
                                <Form.Control
                                    className="mb-3__group__input"
                                    name="firstname"
                                    type="text"
                                    placeholder="first name"
                                    value={user.firstname}
                                    onChange={handleInputChange}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="lastname" className="mb-3__group">
                            <InputGroup>
                                <InputGroup.Text className="mb-3__group__icon">
                                    <i className="small-icon" >LN</i>
                                </InputGroup.Text>
                                <Form.Control
                                    className="mb-3__group__input"
                                    name="lastname"
                                    type="text"
                                    placeholder="last name"
                                    value={user.lastname}
                                    onChange={handleInputChange}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="dob" className="mb-3__group">
                            <InputGroup>
                                <InputGroup.Text className="mb-3__group__icon">
                                    <i className="bi bi-cake2"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    className="mb-3__group__input"
                                    name="dob"
                                    type="text"
                                    placeholder="DOB"
                                    value={user.dob}
                                    onChange={handleInputChange}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <br></br>
                    <div className="button-container">
                        <EditButton type="submit">
                            Update Profile
                        </EditButton>
                        <EditButton onClick={handleBack} type="button"  >
                            Back
                        </EditButton>
                    </div>
                </Form>
            </EditBackground>
        </div>
    )
}