import React from 'react'
import Stocks from '../components/marketData/Stocks'

const Ivestments = ({ currentUser, setStocks, stocks }) => {
    return (
        <div className="investments">
            <Stocks
                currentUser={currentUser}
                setStocks={setStocks}
                stocks={stocks}
            />
        </div>
    )
}

export default Ivestments
