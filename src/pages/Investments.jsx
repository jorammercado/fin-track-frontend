import React from 'react'
import Stocks from '../components/Stocks'

const Ivestments = ({ currentUser }) => {
    return (
        <div>
            <Stocks
                currentUser={currentUser}
            />
        </div>
    )
}

export default Ivestments
