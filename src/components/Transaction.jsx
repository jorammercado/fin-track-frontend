
function Transaction({ transaction }) {
    const createdAt = new Date(transaction.created_at)
    const options = { timeZone: "America/New_York" }
    const estDate = createdAt.toLocaleDateString("en-US", options)
    const estTime = createdAt.toLocaleTimeString("en-US", options)
    return (
        <tr className="transactions__container__table__row-values">
            <td className="transactions__container__table__row-values__cell">{transaction.transaction_id}</td>
            <td className="transactions__container__table__row-values__cell">{transaction.transaction_type}</td>
            <td className="transactions__container__table__row-values__cell">{transaction.amount}</td>
            <td className="transactions__container__table__row-values__cell--category">{transaction.category}</td>
            <td className="transactions__container__table__row-values__cell--description">{transaction.description}</td>
            <td className="transactions__container__table__row-values__cell">{String(transaction.recurring)}</td>
            <td className="transactions__container__table__row-values__cell">{transaction.recurring_frequency}</td>
            <td className="transactions__container__table__row-values__cell">{transaction.risk_level}</td>
            <td className="transactions__container__table__row-values__cell">{String(transaction.is_planned)}</td>
            <td className="transactions__container__table__row-values__cell">{estDate} <br></br> {estTime} EST</td>
            <td className="transactions__container__table__row-values__cell">
                {`checking`}
                <br></br>
                {`saving`}
                <br></br>
                {`investments`}
            </td>
        </tr>
    )
}
export default Transaction