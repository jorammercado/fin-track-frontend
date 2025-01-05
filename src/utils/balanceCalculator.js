export const calculateBalances = (transactions) => {
    const checking = [0]
    const savings = [0]
    const investments = [0]

    transactions.forEach(({ transaction_type, category, amount }) => {
        let balanceColumn

        if (transaction_type === 'expense') {
            balanceColumn = category === 'investment'
                ? 'investments'
                : category === 'savings'
                    ? 'savings_account'
                    : 'checking_account'
        } else if (transaction_type === 'investment') {
            balanceColumn = ['retirement', 'savings', 'emergency fund'].includes(category)
                ? 'savings_account'
                : 'investments'
        } else if (['deposit', 'income'].includes(transaction_type)) {
            balanceColumn = category === 'savings'
                ? 'savings_account'
                : category === 'investment'
                    ? 'investments'
                    : 'checking_account'
        }

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
    })

    return { checking, savings, investments }
}
