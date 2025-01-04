import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import InputGroup from "react-bootstrap/InputGroup"
import Swal from "sweetalert2"
import "./AddTransaction.scss"
import { AddTransactionBackground, EditButton } from "../../styles/styledComponents"

const API = import.meta.env.VITE_API_URL

export default function AddTransactionForm({ currentUser }) {
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
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setTransaction({
            ...transaction,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

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
            .then((data) => {
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

    const handleBack = () => {
        navigate(-1)
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
                                <option value="salary">Salary</option>
                                <option value="checking">Checking</option>
                                <option value="bonus">Bonus</option>
                                <option value="interest">Interest</option>
                                <option value="dividend">Dividend</option>
                                <option value="rental income">Rental Income</option>
                                <option value="business income">Business Income</option>
                                <option value="ivestment">Investment</option>
                                <option value="groceries">Groceries</option>
                                <option value="utilities">Utilities</option>
                                <option value="rent/mortgage">Rent/Mortgage</option>
                                <option value="transportation">Transportation</option>
                                <option value="education">Education</option>
                                <option value="healthcare">Healthcare</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="subscriptions">Subscriptions</option>
                                <option value="travel">Travel</option>
                                <option value="savings">Savings</option>
                                <option value="emergency fund">Emergency Fund</option>
                                <option value="retirement">Retirement</option>
                                <option value="clothing">Clothing</option>
                                <option value="dining">Dining</option>
                                <option value="household supplies">Household Supplies</option>
                                <option value="charity">Charity</option>
                                <option value="debt repayment">Debt Repayment</option>
                                <option value="other">Other</option>
                                <option value="wages">Wages</option>
                                <option value="account funding">Account Funding</option>
                                <option value="loan disbursement">Loan Disbursement</option>

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
