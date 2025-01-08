import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Transaction from './Transaction'
import Graph from './TransactionsGraph'
import Pagination from '../../layout/Pagination'

import { calculateBalances } from '../../utils/balanceCalculator'
import {
    handleSortType as handleSortTypeHandler,
    handleSortAmount as handleSortAmountHandler,
    handleSortCategory as handleSortCategoryHandler,
    handleSortRecurring as handleSortRecurringHandler,
    handleSortRecurringFreq as handleSortRecurringFreqHandler,
    handleSortRiskLevel as handleSortRiskLevelHandler,
    handleSortIsPlanned as handleSortIsPlanneHandler,
    handleSortDate as handleSortDateHandler
} from '../../utils/sorting'

import {
    TransactionsButton,
    TransactionsButtonDate,
    TransactionsButtonDisabled,
    TransactionsButtonDisabledBalances
} from '../../styledComponents/buttons'
import './TransactionsList.scss'

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
        handleSortTypeHandler(
            event, allTransactions, setAllTransactions, typeOrder, setTypeOrder
        )
    }

    const handleSortAmount = event => {
        handleSortAmountHandler(
            event, allTransactions, setAllTransactions, amountOrder, setAmountOrder
        )
    }

    const handleSortCategory = event => {
        handleSortCategoryHandler(
            event, allTransactions, setAllTransactions, categoryOrder, setCategoryOrder
        )
    }

    const handleSortRecurring = event => {
        handleSortRecurringHandler(
            event, allTransactions, setAllTransactions, recurringOrder, setRecurringOrder
        )
    }

    const handleSortRecurringFreq = event => {
        handleSortRecurringFreqHandler(
            event, allTransactions, setAllTransactions, recurringOrderFreq, setRecurringOrderFreq
        )
    }

    const handleSortRiskLevel = event => {
        handleSortRiskLevelHandler(
            event, allTransactions, setAllTransactions, riskLevelOrder, setRiskLevelOrder
        )
    }

    const handleSortIsPlanned = event => {
        handleSortIsPlanneHandler(
            event, allTransactions, setAllTransactions, isPlannedOrder, setIsPlannedOrder
        )
    }

    const handleSortDate = event => {
        handleSortDateHandler(
            event, allTransactionsDateOrder, setAllTransactions, dateOrder, setDateOrder
        )
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

                const { checking, savings, investments } = calculateBalances(data)
                setCheckingBalance(checking)
                setSavingsBalance(savings)
                setInvestmentBalance(investments)
            })
            .catch((error) => {
                console.error('Error fetching data: ', error)
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
                <table className="table table-hover table-responsive table-dark transactions__container__table table-bordered">
                    <tbody>
                        <tr className="transactions__container__table__transactioncount">
                            <td colSpan={11} className="transactions__container__table__transactioncount__count">
                                Tot: {allTransactions.length}
                            </td>
                        </tr>
                        <tr className="transactions__container__table__headers">
                            <td className="transactions__container__table__headers__count">
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
                                    Balances (as of txn. logged)
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
                                <TransactionsButton
                                    type="button"
                                    onClick={() => navigate(`/users/${currentUser?.account_id}/profile/transactions/add`)}
                                >
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