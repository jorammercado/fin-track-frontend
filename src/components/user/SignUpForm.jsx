import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'

import { Form, Col, Row, InputGroup } from "react-bootstrap"
import { SignUpBackground } from '../../styledComponents/styledLayouts'
import { SignUpButton } from '../../styledComponents/buttons'
import asterisk from "../../assets/images/asterisk.svg"
import "./SignUpForm.scss"

const API = import.meta.env.VITE_API_URL

export default function SignUpForm({ setCurrentUser }) {
    const [user, setUser] = useState({
        account_id: 0,
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        dob: "",
        registration_date: ""
    })
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const addUser = () => {
        fetch(`${API}/accounts`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then((data) => {
                if (data?.error) {
                    throw new Error(data?.error)
                }
                else if (data?.err) {
                    throw new Error(data?.err)
                }
                else {
                    Swal.fire({
                        text: `Account ${data?.createdAccount?.username} successfully created`,
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#07a'
                    }).then(() => {
                        setCurrentUser(data?.createdAccount, data?.token)
                        navigate(`/users/${data?.createdAccount?.account_id}/profile`)
                        setUser({
                            account_id: 0,
                            firstname: "",
                            lastname: "",
                            username: "",
                            email: "",
                            password: "",
                            dob: "",
                            registration_date: ""
                        })
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
        if (name === "confirm-password") {
            setConfirmPassword(value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (user.password !== confirmPassword) {
            Swal.fire({
                text: 'Passwords do not match. Please try again.',
                confirmButtonText: 'OK',
                confirmButtonColor: '#07a'
            })
        } else {
            addUser()
        }
    }

    return (
        <div className="form-new-user">
            <SignUpBackground >
                <Form className="form" noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="username" className="mb-3__group">
                            <InputGroup>
                                <InputGroup.Text className="mb-3__group__icon">
                                    <i className="bi bi-person-fill "></i>
                                    <img className="mb-3__group__icon__asterisk" src={asterisk} alt="asterisk" />
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
                                    <img className="mb-3__group__icon__asterisk" src={asterisk} alt="asterisk" />
                                </InputGroup.Text>
                                <Form.Control
                                    className="mb-3__group__input"
                                    name="email"
                                    type="text"
                                    placeholder="email"
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
                                    <i className="mb-3__group__icon__letters" >FN</i>
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
                                    <i className="mb-3__group__icon__letters" >LN</i>
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
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="password" className="mb-3__group">
                            <InputGroup>
                                <InputGroup.Text className="mb-3__group__icon">
                                    <i className="bi bi-shield-lock"></i>
                                    <img className="mb-3__group__icon__asterisk" src={asterisk} alt="asterisk" />
                                </InputGroup.Text>
                                <Form.Control
                                    className="mb-3__group__input"
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                    value={user.password}
                                    onChange={handleInputChange}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="confirm-password" className="mb-3__group">
                            <InputGroup>
                                <InputGroup.Text className="mb-3__group__icon">
                                    <i className="bi bi-shield-lock"></i>
                                    <img className="mb-3__group__icon__asterisk" src={asterisk} alt="asterisk" />
                                </InputGroup.Text>
                                <Form.Control
                                    className="mb-3__group__input"
                                    name="confirm-password"
                                    type="password"
                                    placeholder="confirm password"
                                    value={confirmPassword}
                                    onChange={handleInputChange}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <SignUpButton type="submit">
                        Create Account
                    </SignUpButton>
                </Form>
            </SignUpBackground>
        </div>
    )
}