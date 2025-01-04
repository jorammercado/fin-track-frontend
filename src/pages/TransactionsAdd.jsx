import React from 'react'
import AddTransaction from '../components/transactions/AddTransaction'

const TransactionsAdd = ({ currentUser }) => {
    return (
        <div>
            <AddTransaction
                currentUser={currentUser}
            />
        </div>
    )
}

export default TransactionsAdd
