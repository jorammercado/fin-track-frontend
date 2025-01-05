export const handleSortType = (
    event,
    allTransactions,
    setAllTransactions,
    typeOrder,
    setTypeOrder
) => {
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

export const handleSortAmount = (
    event,
    allTransactions,
    setAllTransactions,
    amountOrder,
    setAmountOrder
) => {
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

export const handleSortCategory = (
    event,
    allTransactions,
    setAllTransactions,
    categoryOrder,
    setCategoryOrder,

) => {
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

export const handleSortRecurring = (
    event,
    allTransactions,
    setAllTransactions,
    recurringOrder,
    setRecurringOrder
) => {
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

export const handleSortRecurringFreq = (
    event,
    allTransactions,
    setAllTransactions,
    recurringOrderFreq,
    setRecurringOrderFreq
) => {
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

export const handleSortRiskLevel = (
    event,
    allTransactions,
    setAllTransactions,
    riskLevelOrder,
    setRiskLevelOrder
) => {
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

export const handleSortIsPlanned = (
    event,
    allTransactions,
    setAllTransactions,
    isPlannedOrder,
    setIsPlannedOrder
) => {
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

export const handleSortDate = (
    event,
    allTransactionsDateOrder,
    setAllTransactions,
    dateOrder,
    setDateOrder
) => {
    event.preventDefault()
    if (dateOrder)
        setAllTransactions([...allTransactionsDateOrder])
    else
        setAllTransactions([...allTransactionsDateOrder].reverse())
    setDateOrder(!dateOrder)
}