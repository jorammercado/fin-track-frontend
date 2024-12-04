import React, { useState, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import Transaction from "./Transaction"
import "./TransactionsList.scss"
import Pagination from "./Pagination"
import {
    TransactionsButton,
    TransactionsButtonDisabled
} from '../styles/styledComponents'

const API = import.meta.env.VITE_API_URL

export default function TransactionsList({ currentUser }) {
    let { account_id } = useParams()
    const [balancePerTransaction, setBalancePerTransaction] = useState([])
    const [itemIndex, setItemIndex] = useState([])

    const [allTransactions, setAllTransactions] = useState([])
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
            })
            .catch((error) => {
                console.error("Error fetching data: ", error)
            })
    }, [])

    let PageSize = 5
    const [currentPage, setCurrentPage] = useState(1)
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize
        const lastPageIndex = firstPageIndex + PageSize
        return allTransactions?.slice(firstPageIndex, lastPageIndex)
    }, [currentPage, allTransactions])

    return (
        <div className="transactions">
            {allTransactions && allTransactions?.length > 0 ?
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
                                { transaction.index = itemIndex.indexOf(transaction.transaction_id) + 1 }
                                return (
                                    <Transaction
                                        key={transaction.transaction_id}
                                        transaction={transaction}
                                    />
                                )
                            }, itemIndex)}
                        </tbody>
                    </table>
                    <Pagination
                        className="transactions__pagination-bar"
                        currentPage={currentPage}
                        totalCount={allTransactions.length}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </section> :
                <>
                    <h1>
                        No transactions at this time.
                    </h1>
                </>
            }
        </div>
    )
}
