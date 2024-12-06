import React from 'react'

export default function Stock({ stock }) {
    return (
        <tr className="transactions__container__table__row-values">
            <td className="transactions__container__table__row-values__cell">{stock.ticker}</td>
            <td className="transactions__container__table__row-values__cell">{stock.todaysChange}</td>
            <td className="transactions__container__table__row-values__cell">{stock.todaysChangePerc}</td>
            <td className="transactions__container__table__row-values__cell">{stock.day.o}</td>
            <td className="transactions__container__table__row-values__cell">{stock.day.h}</td>
            <td className="transactions__container__table__row-values__cell">{stock.day.l}</td>
            <td className="transactions__container__table__row-values__cell">{stock.day.c}</td>
            <td className="transactions__container__table__row-values__cell">{stock.day.v}</td>
            <td className="transactions__container__table__row-values__cell">{stock.day.vw}</td>
            <td className="transactions__container__table__row-values__cell">{stock.prevDay.o}</td>
            <td className="transactions__container__table__row-values__cell">{stock.prevDay.h}</td>
            <td className="transactions__container__table__row-values__cell">{stock.prevDay.l}</td>
            <td className="transactions__container__table__row-values__cell">{stock.prevDay.c}</td>
            <td className="transactions__container__table__row-values__cell">{stock.prevDay.v}</td>
            <td className="transactions__container__table__row-values__cell">{stock.prevDay.vw}</td>
        </tr>
    )
}
