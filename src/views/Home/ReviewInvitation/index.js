import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styles from './ReviewInvitation.module.scss'

const InvitationMsg = props => {

    return (
        <>
            <div className={styles["greeting-msg"]} >
                Hello, {props.userName}!
            </div>
            <div className={styles["invitation-msg"]} >
                You have something to reapet. Your cards are awaiting you.. Let’s start learning!
            </div>
        </>
    )
}

const ReviewInvitation = () => {
    return (
        <div className={styles["greeting"]}>
            <InvitationMsg  userName="Anastasia"/>
            <Link to="/session" className={styles["start-btn"]}>Start now</Link>
        </div>
    )
}

export default ReviewInvitation