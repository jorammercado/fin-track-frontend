import React, { useEffect, useState } from 'react'
import "./MarketNews.scss"

const API = import.meta.env.VITE_FINNHUB_API_KEY

const FinancialNews = () => {
    const [news, setNews] = useState([])

    useEffect(() => {
        const fetchFinancialNews = async () => {
            try {
                const response = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${API}`)
                if (!response?.ok) {
                    throw new Error(`Error: ${response?.statusText}`)
                }
                const data = await response?.json()
                setNews(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchFinancialNews()
    }, [])

    return (
        <div>
            {news?.length > 0 ?
                <div className="news" >
                    <div className="news__container" >
                        {news?.map((item, index) => (
                            <div className="news__container__story"
                                key={index}
                                onClick={() => window.open(item?.url, '_blank', 'noopener, noreferrer')}
                            >
                                <div className="news__container__story__text">
                                    <div className="headline" >{item?.headline}</div>
                                    <div className="summary" >{item?.summary}</div>
                                </div>
                                <div>
                                    <img src={item?.image}
                                        height={
                                            item?.image?.includes('market_watch_logo.png') ? "20px" : "55px"}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div> :
                <div className="spinner-container-stocks">
                    <div className="loading-spinner-stocks"></div>
                </div>}
        </div>
    )
}

export default FinancialNews
