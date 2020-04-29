import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Statistics from './Statistics'
import ReviewLinksBoard from './ReviewLinksBoard'
import Invitation from './ReviewInvitation'
import styles from './Home.module.scss'
import { DataContext } from '../../DataManger'

 const Home = () => { 
    const {manager} = useContext(DataContext);

    const [userName, setUserName] = useState(null);
    const [total, setTotal] = useState(0)
    const [collections, setCollections] = useState([]);

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let cardsLoading = manager.getTotalRepeatNumber().then(data => setTotal(data));
        let nameLoading = manager.getUserName().then(name => setUserName(name));
        let collectionLoading = manager.getCollectionToRepeatPreviews().then(data => setCollections(data))

        Promise.all([cardsLoading, nameLoading, collectionLoading]).then(() => setIsLoading(false));

    }, [manager])

    console.log(isLoading)

    return(
        !isLoading?
        <>
            <section className={styles["main-section"]}>
                <Link to="/card/new" className={styles["add-btn"]}> Add card</Link>
                <Invitation userName={userName} total={total}/>
            </section>
            <ReviewLinksBoard collections={collections}/>
            <Statistics/>
        </> :
        <div>Loading...</div>
    );
}


export default Home;
