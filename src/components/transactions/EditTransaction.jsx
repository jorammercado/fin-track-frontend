import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Swal from "sweetalert2"

import { handleInputChange as handleInput } from "../../utils/formHandler"
import { navigateBack } from "../../utils/navigation"
import { categories } from "../../data/categories"
import { transactionTypes } from "../../data/transactionTypes"
import { recurringFrequencies } from "../../data/recurringFrequencies"
import { riskLevels } from "../../data/riskLevels"

import { Form, Col, Row, InputGroup } from "react-bootstrap"
import { EditTransactionBackground } from "../../styledComponents/styledLayouts"
import { SmallEditButton } from "../../styledComponents/buttons"
import "./EditTransaction.scss"

const API = import.meta.env.VITE_API_URL

const EditTransaction = ({ currentUser }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [transaction, setTransaction] = useState(location?.state?.transaction || {})

    const handleInputChange = (event) => handleInput(event, transaction, setTransaction)
    const handleBack = () => navigateBack(navigate)

    const handleSubmit = (event) => {
        event.preventDefault()

        if (transaction.amount === 0) {
            Swal.fire({
                text: "Amount must be a non-zero value.",
                confirmButtonText: "OK",
                confirmButtonColor: "#07a",
            })
            return
        }

        const token = localStorage.getItem("authToken")
        fetch(`${API}/accounts/${currentUser.account_id}/transactions/${transaction.transaction_id}`, {
            method: "PUT",
            body: JSON.stringify(transaction),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((data) => {
                        throw new Error(data.error || data.message || "Failed to add transaction")
                    })
                }
                return response.json()
            })
            .then((data) => {
                Swal.fire({
                    text: "Transaction successfully updated!",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#07a",
                }).then(() => {
                    navigate(`/users/${currentUser.account_id}/profile/transactions`)
                })
            })
            .catch((error) => {
                Swal.fire({
                    text: error.message,
                    confirmButtonText: "OK",
                    confirmButtonColor: "#07a",
                })
                console.error("Error updating transaction:", error)
            })
    }

    const handleDelete = (e) => {
        e.preventDefault()
        const token = localStorage.getItem("authToken")
        const httpOptions = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        Swal.fire({
            text: "Are you sure you want to delete this transaction? This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
            confirmButtonColor: "#e74c3c",
            cancelButtonColor: "#07a",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${API}/accounts/${currentUser.account_id}/transactions/${transaction.transaction_id}`, httpOptions)
                    .then(res => res.json())
                    .then(data => {
                        if (data.error) {
                            throw new Error(data.error)
                        }
                        else if (data.err) {
                            throw new Error(data.err)
                        }
                        else {
                            Swal.fire({
                                text: "Transaction successfully deleted!",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#07a",
                            }).then(() => {
                                navigate(`/users/${currentUser.account_id}/profile/transactions`)
                            })
                        }
                    })
                    .catch((err) => {
                        Swal.fire({
                            text: `Server error: ${err}. Cannot delete Transaction.`,
                            confirmButtonText: "OK",
                            confirmButtonColor: "#07a",
                        })
                        console.error(err)
                    })
            } else {
                Swal.fire({
                    text: "Transaction not deleted.",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#07a",
                })
            }
        })
    }

    return (
        <div className="form-add-transaction">
            <EditTransactionBackground>
                <Form className="form" noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3" style={{ color: "red" }}>
                        <Form.Group as={Col} className="mb-3__group">
                            <Form.Label>
                                Updating TXN ID: &nbsp; {transaction.index}
                            </Form.Label>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="transaction_type" className="mb-3__group">
                            <Form.Label>
                                Transaction Type
                            </Form.Label>
                            <Form.Select
                                className="mb-3__group__input"
                                name="transaction_type"
                                value={transaction?.transaction_type}
                                onChange={handleInputChange}
                            >
                                {transactionTypes.map((type, index) => (
                                    <option
                                        key={index}
                                        value={type}
                                    >
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="amount" className="mb-3__group">
                            <InputGroup>
                                <InputGroup.Text className="mb-3__group__icon">
                                    $
                                </InputGroup.Text>
                                <Form.Control
                                    className="mb-3__group__input"
                                    required
                                    name="amount"
                                    type="number"
                                    placeholder="Amount"
                                    value={transaction?.amount}
                                    onChange={handleInputChange}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="category" className="mb-3__group">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                className="mb-3__group__input"
                                name="category"
                                value={transaction?.category}
                                onChange={handleInputChange}
                            >
                                {categories.map((category, index) => (
                                    <option
                                        key={index}
                                        value={category}
                                    >
                                        {category
                                            .split(" ")
                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(" ")}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="description" className="mb-3__group">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                className="mb-3__group__input"
                                name="description"
                                type="text"
                                placeholder="Description"
                                value={transaction?.description}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="recurring" className="mb-3__group--recurring">
                            <Form.Check
                                type="checkbox"
                                name="recurring"
                                label="Recurring"
                                checked={transaction?.recurring}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="recurring_frequency" className="mb-3__group">
                            <Form.Label>Recurring Frequency</Form.Label>
                            <Form.Select
                                className="mb-3__group__input"
                                name="recurring_frequency"
                                value={transaction?.recurring_frequency}
                                onChange={handleInputChange}
                                disabled={!transaction?.recurring}
                            >
                                {recurringFrequencies.map((frequency, index) => (
                                    <option
                                        key={index}
                                        value={frequency}
                                    >
                                        {frequency
                                            .split("-")
                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join("-")}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="risk_level" className="mb-3__group">
                            <Form.Label>Risk Level</Form.Label>
                            <Form.Select
                                className="mb-3__group__input"
                                name="risk_level"
                                value={transaction?.risk_level}
                                onChange={handleInputChange}
                            >
                                {riskLevels.map((Level, index) => (
                                    <option
                                        key={index}
                                        value={Level}
                                    >
                                        {Level
                                            .split("/")
                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join("/")}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="is_planned" className="mb-3__group">
                            <Form.Check
                                type="checkbox"
                                name="is_planned"
                                label="Planned"
                                checked={transaction?.is_planned}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Row>

                    <div className="button-container">
                        <SmallEditButton type="submit">Update </SmallEditButton>
                        <SmallEditButton onClick={handleBack} type="button">
                            Back
                        </SmallEditButton>
                        <SmallEditButton onClick={handleDelete} type="button">
                            Delete
                        </SmallEditButton>
                    </div>
                </Form>
            </EditTransactionBackground>
        </div>
    )
}

export default EditTransaction