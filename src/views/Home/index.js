import React, { useContext, useState, useEffect } from 'react'
import Statistics from './Statistics'
import ReviewLinksBoard from './ReviewLinksBoard'
import ReviewInvitation from './ReviewInvitation'
import styles from './Home.module.scss'
import LinkButton from '../../components/LinkButton'
import Loader from '../../components/Loader'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'


 const Home = () => { 
    const {username, token} = useContext(AuthContext)
    const {request} = useHttp(token)

    const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [collections, setCollections] = useState(null)

    useEffect(() => {
        const collectionsRequest = request('/api/collections/needReview').then(setCollections)
        const cardsnRequest = request('/api/cards/count').then(res => setTotal(res.count))
        Promise.all([cardsnRequest, collectionsRequest]).then(() => setLoading(false))
    }, [request])

    if(loading){
        return(
            <Loader/>
        )
    }

    return (
        <>
            <section className={styles["main-section"]}>
                <LinkButton url="/card/new" className={styles["add-btn"]} label="Add card"/>
                <ReviewInvitation username={username} total={total} />
            </section>
            <ReviewLinksBoard collections={collections}/>
            <Statistics/>
        </> ) 
}


export default Home;
