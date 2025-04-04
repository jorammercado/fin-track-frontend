import { useEffect, useState, useMemo } from 'react'

import Stock from './Stock'
import Pagination from '../../layout/Pagination'

import Spinner from '../common/Spinner'
import { SortStocksButton } from '../../styledComponents/buttons'
import { tickers } from '../../data/tickers'
import { tickersMax20 } from '../../data/tickersMax20'
import './StocksList.scss'

const API = import.meta.env.VITE_EODHD_API_TOKEN

const StocksList = () => {
    const [stocksData, setStocksData] = useState(null)
    const [sortOrder, setSortOrder] = useState('asc')

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                if (!stocksData) {
                    const response = await fetch(`https://eodhd.com/api/real-time/AAPL?s=MDIV,DVQQ&api_token=${API}&fmt=json`)
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`)
                    }
                    const data = await response.json()
                    setStocksData(data)
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
                <div className="stocks-wrapper">
                    <div className="stocks">
                        <section className="stocks__container">
                            <table className="table table-hover table-responsive table-dark stocks__container__table">
                                <tbody>
                                    <tr className="stocks__container__table__headers">
                                        <td className="stocks__container__table__headers__count">Stocks: {stocksData?.length}</td>
                                        <td colSpan="8" style={{ textAlign: "center" }}>Today</td>
                                        <td colSpan="6" style={{ textAlign: "center" }}>Previous Day</td>
                                    </tr>
                                    <tr className="stocks__container__table__headers">
                                        <td >
                                            <SortStocksButton onClick={handleSort} type="button">
                                                {sortOrder === "asc" ? "\u2191" : "\u2193"}
                                            </SortStocksButton>
                                        </td>
                                        <td>Timestamp</td>
                                        <td>Change</td>
                                        <td>Change %</td>
                                        <td>Open </td>
                                        <td>High </td>
                                        <td>Low </td>
                                        <td>Close </td>
                                        <td>Volume </td>
                                        <td>Previous Close </td>
                                    </tr>
                                    {currentTableData?.map((stock) => (
                                        <Stock key={stock.code} stock={stock} />
                                    ))}
                                </tbody>
                            </table>
                            <Pagination
                                className="stocks__pagination-bar"
                                currentPage={currentPage}
                                totalCount={stocksData?.length}
                                pageSize={PageSize}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </section>
                    </div>
                </div>
            ) : (
                <Spinner />
            )}
        </div>
    )
}

export default StocksList