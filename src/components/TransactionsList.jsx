import React, { useState, useEffect, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Transaction from "./Transaction"
import "./TransactionsList.scss"
import Pagination from "./Pagination"
import {
    TransactionsButton,
    TransactionsButtonDisabled
} from '../styles/styledComponents'
import Graph from "./TransactionsGraph"

const API = import.meta.env.VITE_API_URL

export default function TransactionsList({ currentUser }) {
    let { account_id } = useParams()
    const [itemIndex, setItemIndex] = useState([])
    const [checkingBalance, setCheckingBalance] = useState([])
    const [savingsBalance, setSavingsBalance] = useState([])
    const [investmentBalance, setInvestmentBalance] = useState([])
    const navigate = useNavigate()

    const [allTransactions, setAllTransactions] = useState([{
        transaction_id: 0,
        account_id: account_id,
        ammount: 0,
        category: 'other',
        description: '',
        recurring: false,
        recurring_frequency: 'one-time',
        risk_level: 'n/a',
        is_planned: false,
        created: new Date()
    }])
    // const [typeOrder, setTypeOrder] = useState(false)
    // const [amountOrder, setAmountOrder] = useState(false)
    // const [categoryOrder, setCategoryOrder] = useState(false)
    // const [recurringOrder, setRecurringOrder] = useState(false)
    // const [recurringOrderFreq, setRecurringFreqOrder] = useState(false)
    // const [riskLevelOrder, setRiskLevelOrder] = useState(false)
    // const [isPlannedOrder, setIsPlannedOrder] = useState(false)
    // const [dateOrder, setDateOrder] = useState(false)

    const handleSortType = event => {
        event.preventDefault()

    }

    const handleSortAmount = event => {
        event.preventDefault()

    }

    const handleSortCategory = event => {
        event.preventDefault()

    }

    const handleSortRecurring = event => {
        event.preventDefault()

    }

    const handleSortRecurringFreq = event => {
        event.preventDefault()

    }

    const handleSortRiskLevel = event => {
        event.preventDefault()

    }

    const handleSortIsPlanned = event => {
        event.preventDefault()

    }

    const handleSortDate = event => {
        event.preventDefault()

    }

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
                setItemIndex(data.map((elem, index) => elem.transaction_id))

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

    let PageSize = 5
    const [currentPage, setCurrentPage] = useState(1)
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize
        const lastPageIndex = firstPageIndex + PageSize
        return allTransactions?.slice(firstPageIndex, lastPageIndex)
    }, [currentPage, allTransactions])

    return (
        <div className="transactions">
            <div className="transactions__graph">
                <Graph
                    checking={checkingBalance}
                    savings={savingsBalance}
                    investments={investmentBalance}
                />
            </div>
            <section className="transactions__container">
                <table className="table table-hover table-responsive table-dark transactions__container__table ">
                    <tbody>
                        <tr className="transactions__container__table__headers">
                            <td className="transactions__container__table__headers__count">
                                Transactions: {allTransactions.length}
                            </td>
                            <td >
                                <TransactionsButton onClick={handleSortType}>
                                    Type
                                </TransactionsButton>
                            </td>
                            <td >
                                <TransactionsButton onClick={handleSortAmount}>
                                    Amount
                                </TransactionsButton>
                            </td>
                            <td >
                                <TransactionsButton onClick={handleSortCategory}>
                                    Category
                                </TransactionsButton>
                            </td>
                            <td >
                                <TransactionsButtonDisabled >
                                    Description
                                </TransactionsButtonDisabled>
                            </td>
                            <td >
                                <TransactionsButton onClick={handleSortRecurring}>
                                    Recurring
                                </TransactionsButton>
                            </td>
                            <td >
                                <TransactionsButton onClick={handleSortRecurringFreq}>
                                    Recurring Freq.
                                </TransactionsButton>
                            </td>
                            <td >
                                <TransactionsButton onClick={handleSortRiskLevel}>
                                    Risk Level
                                </TransactionsButton>
                            </td>
                            <td >
                                <TransactionsButton onClick={handleSortIsPlanned}>
                                    Is Planned
                                </TransactionsButton>
                            </td>
                            <td >
                                <TransactionsButton onClick={handleSortDate}>
                                    Date Added
                                </TransactionsButton>
                            </td>
                            <td >
                                <TransactionsButtonDisabled >
                                    Balance
                                </TransactionsButtonDisabled>
                            </td>
                        </tr>
                        {currentTableData.map((transaction, index) => {
                            const globalIndex = (currentPage - 1) * PageSize + index
                            return (
                                <Transaction
                                    key={transaction.transaction_id}
                                    transaction={transaction}
                                    checking={checkingBalance}
                                    savings={savingsBalance}
                                    investment={investmentBalance}
                                    index={globalIndex}
                                />
                            )
                        }, itemIndex)}
                        <tr className="transactions__container__table__headers--bottom">
                            <td colSpan="11">
                                <TransactionsButton type="button" onClick={() => navigate(`/users/${currentUser?.account_id}/profile/transactions/editlist`)} >
                                    Add Transaction
                                </TransactionsButton>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Pagination
                    className="transactions__pagination-bar"
                    currentPage={currentPage}
                    totalCount={allTransactions.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </section>
        </div>
    )
}
