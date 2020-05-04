import React, { useContext, useState, useEffect } from 'react'
import Statistics from './Statistics'
import ReviewLinksBoard from './ReviewLinksBoard'
import ReviewInvitation from './ReviewInvitation'
import styles from './Home.module.scss'
import { DataContext } from '../../DataManger'
import LinkButton from '../../components/LinkButton'


 const Home = () => { 
    const {manager} = useContext(DataContext);

    const [userName, setUserName] = useState(null);
    const [isUserNew, setIsUserNew] = useState(true);
    const [total, setTotal] = useState(0)
    const [collections, setCollections] = useState(null);

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let cardsLoading = manager.getTotalRepeatNumber().then(setTotal);
        let nameLoading = manager.getUserName().then(setUserName);
        let collectionLoading = manager.getCollectionToRepeatPreviews().then(setCollections);
        let statusLoading = manager.isUserNew().then(setIsUserNew);

        Promise.all([cardsLoading, nameLoading, collectionLoading, statusLoading]).then(() => setIsLoading(false));

    }, [manager])

    return !isLoading ?
        <>
            <section className={styles["main-section"]}>
                <LinkButton url="/card/new" className={styles["add-btn"]} label="Add card"/>
                <ReviewInvitation userName={userName} total={total} isUserNew={isUserNew}/>
            </section>
            <ReviewLinksBoard collections={collections}/>
            <Statistics/>
        </> :
        <div>Loading...</div>
    ;
}


export default Home;
