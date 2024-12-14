import React, { useState, useEffect, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Transaction from "./Transaction"
import "./TransactionsList.scss"
import Pagination from "./Pagination"
import {
    TransactionsButton,
    TransactionsButtonDisabled,
    TransactionsButtonDisabledBalances,
    TransactionsButtonDate
} from '../styles/styledComponents'
import Graph from "./TransactionsGraph"

const API = import.meta.env.VITE_API_URL

export default function TransactionsList({ currentUser }) {
    let { account_id } = useParams()
    const [checkingBalance, setCheckingBalance] = useState([])
    const [savingsBalance, setSavingsBalance] = useState([])
    const [investmentBalance, setInvestmentBalance] = useState([])
    const navigate = useNavigate()

    const [allTransactions, setAllTransactions] = useState([{
        transaction_id: 0,
        account_id: account_id,
        transaction_type: 'income',
        amount: 0,
        category: 'other',
        description: '',
        recurring: false,
        recurring_frequency: 'one-time',
        risk_level: 'n/a',
        is_planned: false,
        created: new Date()
    }])
    const [allTransactionsDateOrder, setAllTransactionsDateOrder] = useState([])
    const [typeOrder, setTypeOrder] = useState(false)
    const [amountOrder, setAmountOrder] = useState(false)
    const [categoryOrder, setCategoryOrder] = useState(false)
    const [recurringOrder, setRecurringOrder] = useState(false)
    const [recurringOrderFreq, setRecurringOrderFreq] = useState(false)
    const [riskLevelOrder, setRiskLevelOrder] = useState(false)
    const [isPlannedOrder, setIsPlannedOrder] = useState(false)
    const [dateOrder, setDateOrder] = useState(false)

    const handleSortType = event => {
        event.preventDefault()
        const sortedTransactions = [...allTransactions].sort((a, b) => {
            if (typeOrder) {
                return b.transaction_type.localeCompare(a.transaction_type)
            }
            return a.transaction_type.localeCompare(b.transaction_type)
        })

        setAllTransactions(sortedTransactions)
        setTypeOrder(!typeOrder)
    }

    const handleSortAmount = event => {
        event.preventDefault()
        const sortedTransactions = [...allTransactions].sort((a, b) => {
            if (amountOrder) {
                return b.amount - a.amount
            }
            return a.amount - b.amount
        })

        setAllTransactions(sortedTransactions)
        setAmountOrder(!amountOrder)
    }

    const handleSortCategory = event => {
        event.preventDefault()
        const sortedTransactions = [...allTransactions].sort((a, b) => {
            if (categoryOrder) {
                return b.category.localeCompare(a.category)
            }
            return a.category.localeCompare(b.category)
        })

        setAllTransactions(sortedTransactions)
        setCategoryOrder(!categoryOrder)
    }

    const handleSortRecurring = event => {
        event.preventDefault()
        const sortedTransactions = [...allTransactions].sort((a, b) => {
            if (recurringOrder) {
                return b.recurring - a.recurring
            }
            return a.recurring - b.recurring
        })

        setAllTransactions(sortedTransactions)
        setRecurringOrder(!recurringOrder)
    }

    const handleSortRecurringFreq = event => {
        event.preventDefault()
        const sortedTransactions = [...allTransactions].sort((a, b) => {
            if (recurringOrderFreq) {
                return b.recurring_frequency.localeCompare(a.recurring_frequency)
            }
            return a.recurring_frequency.localeCompare(b.recurring_frequency)
        })

        setAllTransactions(sortedTransactions)
        setRecurringOrderFreq(!recurringOrderFreq)
    }

    const handleSortRiskLevel = event => {
        event.preventDefault()
        const sortedTransactions = [...allTransactions].sort((a, b) => {
            if (riskLevelOrder) {
                return b.risk_level.localeCompare(a.risk_level)
            }
            return a.risk_level.localeCompare(b.risk_level)
        })

        setAllTransactions(sortedTransactions)
        setRiskLevelOrder(!riskLevelOrder)
    }

    const handleSortIsPlanned = event => {
        event.preventDefault()
        const sortedTransactions = [...allTransactions].sort((a, b) => {
            if (isPlannedOrder) {
                return b.is_planned - a.is_planned
            }
            return a.is_planned - b.is_planned
        })

        setAllTransactions(sortedTransactions)
        setIsPlannedOrder(!isPlannedOrder)

    }

    const handleSortDate = event => {
        event.preventDefault()
        if (dateOrder)
            setAllTransactions([...allTransactionsDateOrder])
        else
            setAllTransactions([...allTransactionsDateOrder].reverse())
        setDateOrder(!dateOrder)
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
                setAllTransactions(data?.sort((a, b) => a?.transaction_id - b?.transaction_id))
                setAllTransactionsDateOrder(data?.sort((a, b) => a?.transaction_id - b?.transaction_id))

                let checking = [0]
                let savings = [0]
                let investments = [0]

                data.forEach(transaction => {
                    let balanceColumn
                    const { transaction_type, category, amount } = transaction
                    if (transaction_type === 'expense') {
                        if (category === 'investment') {
                            balanceColumn = 'investments'
                        } else if (category === 'savings') {
                            balanceColumn = 'savings_account'
                        } else {
                            balanceColumn = 'checking_account'
                        }
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
                    } else if (transaction_type === 'income') {
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
            <div className="transactions__header">
                <h1 className="transactions__header__title"> Balances per Transaction</h1>
            </div>
            <div className="transactions__graph">
                <Graph
                    checking={checkingBalance}
                    savings={savingsBalance}
                    investments={investmentBalance}
                />
            </div>
            <section className="transactions__container">
                <table className="table table-hover table-responsive table-dark transactions__container__table table-bordered ">
                    <tbody>
                        <tr className="transactions__container__table__headers">
                            <td className="transactions__container__table__headers__count">
                                Tot: {allTransactions.length}
                                <br></br>
                                TXN ID:
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
                                <TransactionsButtonDate onClick={handleSortDate}>
                                    Date/Time Added
                                </TransactionsButtonDate>
                            </td>
                            <td className="transactions__container__table__headers__balances">
                                <TransactionsButtonDisabledBalances >
                                    Balances (as of txn. complete)
                                </TransactionsButtonDisabledBalances>
                            </td>
                        </tr>
                        {currentTableData.map((transaction, index) => {
                            const correctIndex = allTransactionsDateOrder.findIndex(
                                (t) => t.transaction_id === transaction.transaction_id
                            )
                            return (
                                <Transaction
                                    key={transaction.transaction_id}
                                    transaction={transaction}
                                    checking={checkingBalance}
                                    savings={savingsBalance}
                                    investment={investmentBalance}
                                    index={correctIndex}
                                    currentUser={currentUser}
                                />
                            )
                        })}
                        <tr className="transactions__container__table__headers--bottom">
                            <td colSpan="11">
                                <TransactionsButton type="button" onClick={() => navigate(`/users/${currentUser?.account_id}/profile/transactions/add`)} >
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
