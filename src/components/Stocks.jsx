import React, { useEffect, useState, useMemo } from 'react'
import Pagination from '../components/Pagination'

const API = import.meta.env.VITE_POLYGON_API_KEY

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

        </tr>
    )
}

const Stocks = ({ currentUser, setStocks, stocks }) => {
    const [stocksData, setStocksData] = useState(null)

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                if (!stocksData) {
                    const response = await fetch(`https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?apiKey=${API}`)
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`)
                    }
                    const data = await response.json()
                    // console.log(data)
                    setStocks(data.tickers)
                    localStorage.setItem('stocks', JSON.stringify(data))
                    setStocksData(data.tickers)
                    // console.log(data)
                }
            } catch (error) {
                console.error('Error fetching stock data:', error)
            }
        }

        fetchStockData()
    }, [API, stocks, setStocks])
    // console.log(stocks)
    // console.log(stocksData?.tickers?.tickers)
    // console.log(stocksData?.[0]


    let PageSize = 5
    const [currentPage, setCurrentPage] = useState(1)
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize
        const lastPageIndex = firstPageIndex + PageSize
        return stocksData?.slice(firstPageIndex, lastPageIndex)
    }, [currentPage, stocksData])


    return (
        <div>
            {stocksData ? (
                <div>
                    <h2>Stock Data</h2>
                    <div className="transactions">
                        <div className="transactions__graph">
                            {/* <Graph /> */}
                        </div>
                        <section className="transactions__container">
                            <table className="table table-hover table-responsive table-dark transactions__container__table">
                                <tbody>
                                    <tr className="transactions__container__table__headers">
                                        <td className="transactions__container__table__headers__count">
                                            Stocks: {stocksData?.length}
                                        </td>
                                        <td>Change</td>
                                        <td>Change %</td>
                                        <td>Open</td>
                                        <td>High</td>
                                        <td>Low</td>
                                        <td>Close</td>
                                        <td>Volume</td>
                                        <td>VWAP</td>
                                    </tr>
                                    {currentTableData?.map((stock) => (
                                        <Stock key={stock.ticker} stock={stock} />
                                    ))}
                                </tbody>
                            </table>
                            <Pagination
                                className="transactions__pagination-bar"
                                currentPage={currentPage}
                                totalCount={stocksData?.length}
                                pageSize={PageSize}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </section>
                    </div>
                </div>
            ) : (
                <p>unable to retrieve stock data...</p>
            )}
        </div>
    )
}

export default Stocks
