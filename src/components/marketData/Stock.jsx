export default function Stock({ stock }) {
    return (
        <tr className="stocks__container__table__row-values">
            <td className="stocks__container__table__row-values__cell">{stock.code}</td>
            <td className="stocks__container__table__row-values__cell">{stock.timestamp}</td>
            <td className="stocks__container__table__row-values__cell">{stock.change?.toFixed(2)}</td>
            <td className="stocks__container__table__row-values__cell">{stock.change_p?.toFixed(2)}</td>
            <td className="stocks__container__table__row-values__cell">{stock.open?.toFixed(2)}</td>
            <td className="stocks__container__table__row-values__cell">{stock.high?.toFixed(2)}</td>
            <td className="stocks__container__table__row-values__cell">{stock.low?.toFixed(2)}</td>
            <td className="stocks__container__table__row-values__cell">{stock.close?.toFixed(2)}</td>
            <td className="stocks__container__table__row-values__cell">{stock.volume}</td>
            <td className="stocks__container__table__row-values__cell">{stock.previousClose?.toFixed(2)}</td>
        </tr>
    )
}