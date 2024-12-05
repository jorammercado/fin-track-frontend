// import React from 'react'
import React, { useEffect, useState } from 'react'
import Stocks from '../components/Stocks'

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
