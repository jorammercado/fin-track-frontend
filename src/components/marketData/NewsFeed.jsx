import { useEffect, useState } from 'react'

import { SeeMoreButton } from '../../styledComponents/buttons'
import Spinner from '../common/Spinner'
import './NewsFeed.scss'

const API = import.meta.env.VITE_FINNHUB_API_KEY

const NewsFeed = () => {
    const [news, setNews] = useState([])
    const [visibleNews, setVisibleNews] = useState([])
    const [newsIndex, setNewsIndex] = useState(10)

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${API}`)
                if (!response?.ok) {
                    throw new Error(`Error: ${response?.statusText}`)
                }
                const data = await response?.json()
                setNews(data)
                setVisibleNews(data.slice(0, 10))
            } catch (err) {
                console.error(err)
            }
        }
        fetchNews()
    }, [])

    const handleSeeMore = () => {
        const nextIndex = Math.min(newsIndex + 10, news.length)
        setVisibleNews(news.slice(0, nextIndex))
        setNewsIndex(nextIndex)
    }

    return (
        <>
            {news?.length > 0 ?
                <div className="news" >
                    <div className="news__container" >
                        {visibleNews?.map((item, index) => (
                            <div className="news__container__story"
                                key={index}
                                onClick={() => window.open(item?.url, "_blank", "noopener, noreferrer")}
                            >
                                <div className="news__container__story__text">
                                    <div className="headline" >{item?.headline}</div>
                                    <div className="summary" >{item?.summary}</div>
                                </div>
                                <div>
                                    <img src={item?.image}
                                        height={
                                            item?.image?.includes("market_watch_logo.png") ? "20px" : "55px"}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    {newsIndex < news.length && (
                        <div className="news__button">
                            <SeeMoreButton onClick={handleSeeMore}>
                                See More
                            </SeeMoreButton>
                        </div>
                    )}
                </div> :
                <Spinner />}
        </>
    )
}

export default NewsFeed