import React from 'react'
import ReviewLink from '../ReviewLink'
import { Link } from 'react-router-dom'
import styles from './ReviewLinksBoard.module.scss'

const ReviewLinksBoard = ({collections}) => {
    let isNotEmpty = collections.length > 0
    return isNotEmpty ?
        <section className={styles["collecions"]}>
                <header>You can choose a collecion if you want</header>
                <div className={styles["links-board"]}>
                    {collections.map(c => <ReviewLink slug={c.id} name={c.name} cards={c.amount} key={c.id}/>)}
                    <div className={styles["link-container"]}>
                        <Link to="/manage" className={styles["manage-btn"]}>Manage <wbr/> collections</Link>
                    </div>
                </div>
        </section>
        :
        null
}

export default ReviewLinksBoard