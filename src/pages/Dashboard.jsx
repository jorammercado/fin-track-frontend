import BalancesSummary from '../components/transactions/BalancesSummary'

const Dashboard = ({ currentUser }) => {
    return (
        <div>
            <BalancesSummary
                currentUser={currentUser}
            />
        </div>
    )
}

export default Dashboard