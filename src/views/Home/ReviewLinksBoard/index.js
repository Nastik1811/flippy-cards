import React, { useContext, useState } from 'react'
import ReviewLink from '../ReviewLink'
import {collections} from "../../../DummyData" 
import { Link } from 'react-router-dom'
import styles from './ReviewLinksBoard.module.scss'


const ReviewLinksBoard = props => {
    let links = collections.map((c, i) => <ReviewLink slug={i} name={c.name} cards={c.cards.length}/>)
    return (
        <section>
            <header className="section-header">You can also choose a collection:</header>
            <div className={styles["links-board"]}>
                {links}
                <div className={styles["link-container"]}>
                    <Link to="/manage" className={styles["manage-btn"]}>Manage <wbr/> collections</Link>
                </div>
            </div>
        </section>
    )
}

export default ReviewLinksBoard