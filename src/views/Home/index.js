import React from 'react'
import { Link } from 'react-router-dom'
import Statistics from './Statistics'
import ReviewLinksBoard from './ReviewLinksBoard'
import Invitation from './ReviewInvitation'
import styles from './Home.module.scss'

 const Home = () => { 
    return(
        <>
            <section className={styles["main-section"]}>
                <Link to="/new" className={styles["add-btn"]}> Add card</Link>
                <Invitation/>
            </section>
            <ReviewLinksBoard/>
            <Statistics/>
        </>
    );
}


export default Home;
