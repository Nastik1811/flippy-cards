import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ReviewInvitation.module.scss'

const InvitationMsg = ({userName, amount}) => {

    let message = amount > 0 ? 
     `You have something to reapet. ${amount} cards are awaiting you.. Let’s start learning!` :
     `There are no cards ready to repeat. But you can add new one any time! `

    return (
        <>
            <div className={styles["greeting-msg"]} >
                Hello, {userName}!
            </div>
            <div className={styles["invitation-msg"]} >
                {message}
            </div>
        </>
    )
}

const ReviewInvitation = ({userName, total}) => {
    let isNotNull= total > 0

    return (
        <div className={styles["greeting"]}>
            <InvitationMsg  userName={userName} amount={total}/>
            {isNotNull && <Link to="/session" className={styles["start-btn"]} >Start now</Link>}
        </div>
    )
}

export default ReviewInvitation