import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './ReviewInvitation.module.scss'
import { DataContext } from '../../../DataManger'

const InvitationMsg = ({userName, amount}) => {

    return (
        <>
            <div className={styles["greeting-msg"]} >
                Hello, {userName}!
            </div>
            <div className={styles["invitation-msg"]} >
                You have something to reapet. {amount} cards are awaiting you.. Let’s start learning!
            </div>
        </>
    )
}

const ReviewInvitation = () => {
    const {manager} = useContext(DataContext);

    const [userName, setUserName] = useState(null);
    const [total, setTotal] = useState(0)

    useEffect(() => {
        manager.getTotalRepeatNumber().then(data => setTotal(data))
    }, [manager])

    useEffect(() => {
        manager.getUserName().then(name => setUserName(name));
    }, [manager]) 

    return (
        <div className={styles["greeting"]}>
            <InvitationMsg  userName={userName} amount={total}/>
            <Link to="/session" className={styles["start-btn"]}>Start now</Link>
        </div>
    )
}

export default ReviewInvitation