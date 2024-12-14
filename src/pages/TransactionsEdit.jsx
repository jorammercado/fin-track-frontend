import React from 'react'
import EditTransaction from '../components/EditTransaction'

const TransactionsEdit = ({ currentUser }) => {
    return (
        <div>
            <EditTransaction
                currentUser={currentUser}
            />
        </div>
    )
}

export default TransactionsEdit
