import React from 'react'
import TransactionsList from '../components/TransactionsList'

const Transactions = ({ currentUser }) => {
    return (
        <div>
            <TransactionsList
                currentUser={currentUser}
            />
        </div>
    )
}

export default Transactions
