import React from 'react'
import AddTransaction from '../components/AddTransaction'

const TransactionsEdit = ({ currentUser }) => {
    return (
        <div>
            <AddTransaction
                currentUser={currentUser}
            />
        </div>
    )
}

export default TransactionsEdit
