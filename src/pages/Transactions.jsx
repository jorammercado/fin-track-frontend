import TransactionsList from '../components/transactions/TransactionsList'

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