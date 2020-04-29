import React from 'react'
import ReviewLink from '../ReviewLink'
import { Link } from 'react-router-dom'
import styles from './ReviewLinksBoard.module.scss'

const ReviewLinksBoard = ({collections}) => {
    return (
        <section className={styles["main-section"]}>
                <header>You can also choose a collection:</header>
                <div className={styles["links-board"]}>
                    {collections.map(c => <ReviewLink slug={c.id} name={c.name} cards={c.amount} key={c.id}/>)}
                    <div className={styles["link-container"]}>
                        <Link to="/manage" className={styles["manage-btn"]}>Manage <wbr/> collections</Link>
                    </div>
                </div>
        </section>
        )
}

export default ReviewLinksBoard