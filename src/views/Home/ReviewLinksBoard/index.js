import React from 'react'
import ReviewLink from '../ReviewLink'
import { Link } from 'react-router-dom'
import styles from './ReviewLinksBoard.module.scss'

const ReviewLinksBoard = ({collections}) => {
    let isEmpty = collections.length === 0
    if(isEmpty){
        return(
            <section className={styles["image"]}>
                <span className={styles["no-cards"]}>*** Waiting for collections ***</span>
            </section>
        )
    }
    return (
        <section className={styles["collecions"]}>
                <header>You can choose a collecion if you want</header>
                <div className={styles["links-board"]}>
                    {collections.map(c => <ReviewLink slug={c.id} name={c.name} cards={c.cards_number} key={c.id}/>)}
                    <div className={styles["link-container"]}>
                        <Link to="/manage" className={styles["manage-btn"]}>Manage <wbr/> collections</Link>
                    </div>
                </div>
        </section>)
}

export default ReviewLinksBoard