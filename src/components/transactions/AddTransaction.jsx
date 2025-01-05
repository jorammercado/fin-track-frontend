import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

import { handleInputChange as handleInput } from "../../utils/formHandler"
import { navigateBack } from "../../utils/navigation"
import { categories } from "../../data/categories"

import { Form, Col, Row, InputGroup } from "react-bootstrap"
import { AddTransactionBackground } from "../../styledComponents/styledLayouts"
import { EditButton } from "../../styledComponents/buttons"
import "./AddTransaction.scss"

const API = import.meta.env.VITE_API_URL

export default function AddTransactionForm({ currentUser }) {
    const navigate = useNavigate()
    const [transaction, setTransaction] = useState({
        account_id: currentUser.account_id,
        transaction_type: "income",
        amount: 0,
        category: "salary",
        description: "",
        recurring: false,
        recurring_frequency: "one-time",
        risk_level: "n/a",
        is_planned: false,
    })

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
        fetch(`${API}/accounts/${currentUser.account_id}/transactions/create`, {
            method: "POST",
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
            .then(() => {
                Swal.fire({
                    text: "Transaction successfully added!",
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
                console.error("Error adding transaction:", error)
            })
    }

    return (
        <div className="form-add-transaction">
            <AddTransactionBackground>
                <Form className="form" noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="transaction_type" className="mb-3__group">
                            <Form.Label>Transaction Type</Form.Label>
                            <Form.Select
                                className="mb-3__group__input"
                                name="transaction_type"
                                value={transaction.transaction_type}
                                onChange={handleInputChange}
                            >
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                                <option value="investment">Investment</option>
                                <option value="deposit">Deposit</option>
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
                                    value={transaction.amount}
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
                                value={transaction.category}
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
                                value={transaction.description}
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
                                checked={transaction.recurring}
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
                                value={transaction.recurring_frequency}
                                onChange={handleInputChange}
                                disabled={!transaction.recurring}
                            >
                                <option value="one-time">One-Time</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="risk_level" className="mb-3__group">
                            <Form.Label>Risk Level</Form.Label>
                            <Form.Select
                                className="mb-3__group__input"
                                name="risk_level"
                                value={transaction.risk_level}
                                onChange={handleInputChange}
                            >
                                <option value="n/a">N/A</option>
                                <option value="low">Low</option>
                                <option value="moderate">Moderate</option>
                                <option value="high">High</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="is_planned" className="mb-3__group">
                            <Form.Check
                                type="checkbox"
                                name="is_planned"
                                label="Planned"
                                checked={transaction.is_planned}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Row>

                    <div className="button-container">
                        <EditButton type="submit">Add Transaction</EditButton>
                        <EditButton onClick={handleBack} type="button">
                            Back
                        </EditButton>
                    </div>
                </Form>
            </AddTransactionBackground>
        </div>
    )
}