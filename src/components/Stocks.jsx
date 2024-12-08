import React, { useEffect, useState, useMemo } from 'react'
import Pagination from '../components/Pagination'
import Stock from './Stock'
import "./Stocks.scss"
import {
    SortStocksButton
} from '../styles/styledComponents'

const API = import.meta.env.VITE_POLYGON_API_KEY

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
                    setStocks(data.tickers)
                    localStorage.setItem('stocks', JSON.stringify(data.tickers))
                    setStocksData(data.tickers)
                }
            } catch (error) {
                console.error('Error fetching stock data:', error)
            }
        }

        fetchStockData()
    }, [API, stocks, setStocks])

    let PageSize = 15
    const [currentPage, setCurrentPage] = useState(1)
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize
        const lastPageIndex = firstPageIndex + PageSize
        return stocksData?.slice(firstPageIndex, lastPageIndex)
    }, [currentPage, stocksData])

    return (
        <div>
            {stocksData ? (
                <div className='stocks'>
                    <div className="transactions">
                        <section className="transactions__container">
                            <table className="table table-hover table-responsive table-dark transactions__container__table">
                                <tbody>
                                    <tr className="transactions__container__table__headers">
                                        <td className="transactions__container__table__headers__count">Stocks: {stocksData?.length}</td>
                                        <td colSpan="8" style={{ textAlign: "center" }}>Today</td>
                                        <td colSpan="6" style={{ textAlign: "center" }}>Previous Day</td>
                                    </tr>
                                    <tr className="transactions__container__table__headers">
                                        <td > <SortStocksButton>  {` \u21f3`} </SortStocksButton></td>
                                        <td>Change</td>
                                        <td>Change %</td>
                                        <td>Open </td>
                                        <td>High </td>
                                        <td>Low </td>
                                        <td>Close </td>
                                        <td>Volume </td>
                                        <td>VWAP </td>
                                        <td>Open </td>
                                        <td>High </td>
                                        <td>Low </td>
                                        <td>Close </td>
                                        <td>Volume </td>
                                        <td>VWAP </td>
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
                <></>
            )}
        </div>
    )
}

export default Stocks
