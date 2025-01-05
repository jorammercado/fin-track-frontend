import EditTransaction from '../components/transactions/EditTransaction'

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