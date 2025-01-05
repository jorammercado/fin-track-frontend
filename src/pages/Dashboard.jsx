import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

import "./Dashboard.scss"

const API = import.meta.env.VITE_API_URL

const Dashboard = ({ currentUser }) => {
    let { account_id } = useParams()
    const [checkingBalance, setCheckingBalance] = useState([])
    const [savingsBalance, setSavingsBalance] = useState([])
    const [investmentBalance, setInvestmentBalance] = useState([])
    const [allTransactions, setAllTransactions] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('authToken')
        fetch(`${API}/accounts/${account_id}/transactions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ account: currentUser })
        })
            .then((response) => response.json())
            .then((data) => {
                setAllTransactions(data)

                let checking = [0]
                let savings = [0]
                let investments = [0]

                data.forEach(transaction => {
                    let balanceColumn
                    const { transaction_type, category, amount } = transaction
                    if (transaction_type === 'income' || transaction_type === 'expense') {
                        balanceColumn = 'checking_account'
                    } else if (transaction_type === 'investment') {
                        if (['retirement', 'savings', 'emergency fund'].includes(category)) {
                            balanceColumn = 'savings_account'
                        } else {
                            balanceColumn = 'investments'
                        }
                    } else if (transaction_type === 'deposit') {
                        if (category === 'savings') {
                            balanceColumn = 'savings_account'
                        } else if (category === 'investment') {
                            balanceColumn = 'investments'
                        } else {
                            balanceColumn = 'checking_account'
                        }
                    }

                    if (balanceColumn) {
                        const updateValue = transaction_type === 'expense' ? -Number(amount) : Number(amount)
                        if (balanceColumn === 'checking_account') {
                            checking.push(checking[checking.length - 1] + updateValue)
                            savings.push(savings[savings.length - 1])
                            investments.push(investments[investments.length - 1])
                        } else if (balanceColumn === 'savings_account') {
                            savings.push(savings[savings.length - 1] + updateValue)
                            checking.push(checking[checking.length - 1])
                            investments.push(investments[investments.length - 1])
                        } else if (balanceColumn === 'investments') {
                            investments.push(investments[investments.length - 1] + updateValue)
                            savings.push(savings[savings.length - 1])
                            checking.push(checking[checking.length - 1])
                        }
                    }
                })

                setCheckingBalance(checking)
                setSavingsBalance(savings)
                setInvestmentBalance(investments)
            })
            .catch((error) => {
                console.error("Error fetching data: ", error)
            })
    }, [account_id, currentUser, API])
    return (
        <div className="dashboard">
            <article className="user">
                <table className="table user__table table-bordered table-responsive table-hover table-dark ">
                    <tbody>
                    <tr >
                            <th colSpan="4" className="user__table__odd">
                                <div className="user__table__row-content">
                                    <span className="user__table__row-content__label">Account</span>
                                    <span className="user__table__row-content__value"> Balance (USD) </span>
                                </div>
                            </th>
                        </tr>
                        <tr >
                            <th colSpan="4" className="user__table__odd">
                                <div className="user__table__row-content">
                                    <span className="user__table__row-content__label">Checking:</span>
                                    <span className="user__table__row-content__value"> $ &nbsp; {checkingBalance?.[checkingBalance.length - 1]?.toFixed(2)} </span>
                                </div>
                            </th>
                        </tr>
                        <tr >
                            <th colSpan="4" className="user__table__even">
                                <div className="user__table__row-content">
                                    <span className="user__table__row-content__label">Savings:</span>
                                    <span className="user__table__row-content__value">$ &nbsp; {savingsBalance?.[savingsBalance.length - 1]?.toFixed(2)}</span>
                                </div>
                            </th>
                        </tr>
                        <tr >
                            <th colSpan="4" className="user__table__odd">
                                <div className="user__table__row-content">
                                    <span className="user__table__row-content__label">Investment:</span>
                                    <span className="user__table__row-content__value">$ &nbsp; {investmentBalance?.[investmentBalance.length - 1]?.toFixed(2)}</span>
                                </div>
                            </th>
                        </tr>
                        <tr >
                            <th colSpan="4" className="user__table__even">
                                <div className="user__table__row-content">
                                    <span className="user__table__row-content__label"> </span>
                                    <span className="user__table__row-content__value"> </span>
                                </div>
                            </th>
                        </tr>
                        <tr >
                            <th colSpan="4" className="user__table__odd">
                                <div className="user__table__row-content">
                                    <span className="user__table__row-content__label">Transactions Logged:</span>
                                    <span className="user__table__row-content__value">{allTransactions.length}</span>
                                </div>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </article>
        </div>
    )
}

export default Dashboard
