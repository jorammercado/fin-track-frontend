import { useNavigate } from 'react-router-dom'

function Transaction({ transaction, index, checking, savings, investment, currentUser }) {
    const navigate = useNavigate()
    const createdAt = new Date(transaction.created_at)
    const options = { timeZone: "America/New_York" }
    const estDate = createdAt.toLocaleDateString("en-US", options)
    const estTime = createdAt.toLocaleTimeString("en-US", options)
    return (
        <tr className="transactions__container__table__row-values"
            onClick={() => navigate(`/users/${currentUser.account_id}/profile/transactions/edit`)}
        >
            <td className="transactions__container__table__row-values__cell">{index + 1}</td>
            <td className="transactions__container__table__row-values__cell">{transaction.transaction_type}</td>
            <td className="transactions__container__table__row-values__cell">{transaction.amount}</td>
            <td className="transactions__container__table__row-values__cell--category">{transaction.category}</td>
            <td className="transactions__container__table__row-values__cell--description">{transaction.description}</td>
            <td className="transactions__container__table__row-values__cell">{String(transaction.recurring)}</td>
            <td className="transactions__container__table__row-values__cell">{transaction.recurring_frequency}</td>
            <td className="transactions__container__table__row-values__cell">{transaction.risk_level}</td>
            <td className="transactions__container__table__row-values__cell">{String(transaction.is_planned)}</td>
            <td className="transactions__container__table__row-values__cell--date">{estDate} <br></br> {estTime} EST</td>
            <td className="transactions__container__table__row-values__cell--balances">
                checking: &nbsp; {checking?.[index + 1]}
                <br></br>
                savings: &nbsp; {savings?.[index + 1]}
                <br></br>
                investment: &nbsp; {investment?.[index + 1]}
            </td>
        </tr>
    )
}
export default Transaction