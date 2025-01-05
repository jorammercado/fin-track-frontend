export default function Stock({ stock }) {
    return (
        <tr className="transactions__container__table__row-values">
            <td className="transactions__container__table__row-values__cell">{stock.ticker}</td>
            <td className="transactions__container__table__row-values__cell">{stock.todaysChange?.toFixed(2)}</td>
            <td className="transactions__container__table__row-values__cell">{stock.todaysChangePerc?.toFixed(2)}</td>
            <td className="transactions__container__table__row-values__cell">{stock.day.o?.toFixed(2)}</td>
            <td className="transactions__container__table__row-values__cell">{stock.day.h?.toFixed(2)}</td>
            <td className="transactions__container__table__row-values__cell">{stock.day.l?.toFixed(2)}</td>
            <td className="transactions__container__table__row-values__cell">{stock.day.c?.toFixed(2)}</td>
            <td className="transactions__container__table__row-values__cell">{stock.day.v}</td>
            <td className="transactions__container__table__row-values__cell">{stock.day.vw?.toFixed(2)}</td>
            <td className="transactions__container__table__row-values__cell">{stock.prevDay.o?.toFixed(2)}</td>
            <td className="transactions__container__table__row-values__cell">{stock.prevDay.h?.toFixed(2)}</td>
            <td className="transactions__container__table__row-values__cell">{stock.prevDay.l?.toFixed(2)}</td>
            <td className="transactions__container__table__row-values__cell">{stock.prevDay.c?.toFixed(2)}</td>
            <td className="transactions__container__table__row-values__cell">{stock.prevDay.v}</td>
            <td className="transactions__container__table__row-values__cell">{stock.prevDay.vw?.toFixed(2)}</td>
        </tr>
    )
}