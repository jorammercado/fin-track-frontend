import React, { useEffect, useState, useMemo } from 'react'
import Pagination from '../../layout/Pagination'
import Stock from './Stock'
import './Stocks.scss'
import { SortStocksButton } from '../../styles/buttons/SortStocksButton'

const API = import.meta.env.VITE_POLYGON_API_KEY

const Stocks = () => {
    const [stocksData, setStocksData] = useState(null)
    const [sortOrder, setSortOrder] = useState('asc')

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                if (!stocksData) {
                    const response = await fetch(`https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?apiKey=${API}`)
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`)
                    }
                    const data = await response.json()
                    setStocksData(data.tickers)
                }
            } catch (error) {
                console.error('Error fetching stock data:', error)
            }
        }

        fetchStockData()
    }, [API])

    const handleSort = event => {
        event.preventDefault()

        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
        setSortOrder(newSortOrder)

        const sortedData = [...stocksData].sort((a, b) =>
            newSortOrder === 'asc' ? a.ticker.localeCompare(b.ticker) : b.ticker.localeCompare(a.ticker)
        )

        setStocksData(sortedData)
    }

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
                <div className="stocks">
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
                                        <td >
                                            <SortStocksButton onClick={handleSort} type="button">
                                                {sortOrder === "asc" ? "\u2191" : "\u2193"}
                                            </SortStocksButton>
                                        </td>
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
                <div className="spinner-container-stocks">
                    <div className="loading-spinner-stocks"></div>
                </div>
            )}
        </div>
    )
}

export default Stocks
