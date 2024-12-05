import React, { useEffect, useState } from 'react'
import Graph from '../components/Graph' // Assuming Graph component exists
import Pagination from '../components/Pagination'

function Stock({ stock }) {
    return (
        <tr className="transactions__container__table__row-values">
            <td className="transactions__container__table__row-values__cell">{stock.ticker}</td>
            <td className="transactions__container__table__row-values__cell">{stock.todaysChange}</td>
            <td className="transactions__container__table__row-values__cell">{stock.todaysChangePerc}</td>
            <td className="transactions__container__table__row-values__cell">{stock.prevDay.o}</td>
            <td className="transactions__container__table__row-values__cell">{stock.prevDay.h}</td>
            <td className="transactions__container__table__row-values__cell">{stock.prevDay.l}</td>
            <td className="transactions__container__table__row-values__cell">{stock.prevDay.c}</td>
            <td className="transactions__container__table__row-values__cell">{stock.prevDay.v}</td>
            <td className="transactions__container__table__row-values__cell">{stock.prevDay.vw}</td>
            <td className="transactions__container__table__row-values__cell">-</td> {/* Placeholder for date */}
            <td className="transactions__container__table__row-values__cell">-</td> {/* Placeholder for balance */}
        </tr>
    )
}

export default function StocksTable({ stocks, currentPage, setCurrentPage, PageSize }) {
    return (
        <div className="transactions">
            <div className="transactions__graph">
                <Graph />
            </div>
            <section className="transactions__container">
                <table className="table table-hover table-responsive table-dark transactions__container__table">
                    <tbody>
                        <tr className="transactions__container__table__headers">
                            <td className="transactions__container__table__headers__count">
                                Stocks: {stocks.length}
                            </td>
                            <td>Change</td>
                            <td>Change %</td>
                            <td>Open</td>
                            <td>High</td>
                            <td>Low</td>
                            <td>Close</td>
                            <td>Volume</td>
                            <td>VWAP</td>
                            <td>Date Added</td>
                            <td>Balance</td>
                        </tr>
                        {stocks.map((stock) => (
                            <Stock key={stock.ticker} stock={stock} />
                        ))}
                    </tbody>
                </table>
                <Pagination
                    className="transactions__pagination-bar"
                    currentPage={currentPage}
                    totalCount={stocks.length}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </section>
        </div>
    )
}
