import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Statistics from './Statistics'
import CollectionsBoard from './CollectionsBoard'
import Invitation from './Invitation'
import styles from './Home.module.scss'


export const Home = () => { 
    return(
        <>
            <section className={styles.main}>
                <Link to="/new" id="add-card-btn" className="accent-btn large"> Add card</Link>
                <Invitation/>
            </section>
            <CollectionsBoard/>
            <Statistics/>
        </>
    );
}
