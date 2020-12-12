import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ReviewInvitation.module.scss'

const InvitationMsg = ({username, amount}) => {

    let message = amount > 0 ?
     `You have something to repeat. ${amount} cards are awaiting you.. Let’s start learning!`:
     `There are no cards ready to repeat. But you can add new one any time! `


    return (
        <div className={styles["msg"]} >
            <div className={styles["greeting-msg"]} >
                Welcome, {username}!
            </div>
            <div className={styles["invitation-msg"]} >
                {message}
            </div>
        </div>
    )
}

const ReviewInvitation = ({username, total}) => {
    let isNotNull= total > 0
    return (
        <div className={styles["invitation-container"]}>
            <InvitationMsg  username={username} amount={total} />
            {isNotNull && <Link to="/session" className={styles["start-btn"]} >Review all cards</Link>}
        </div>
    )
}

export default ReviewInvitation