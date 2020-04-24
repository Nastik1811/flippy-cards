import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './ReviewInvitation.module.scss'
import { DataContext } from '../../../DataManger'

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
        total > 0 ? 
        <div className={styles["greeting"]}>
            <InvitationMsg  userName={userName} amount={total}/>
            <Link to="/session" className={styles["start-btn"]} >Start now</Link>
        </div>
        :
        <div className={styles["greeting"]}>
            <InvitationMsg  userName={userName} amount={total}/>
        </div>
    )
}

export default ReviewInvitation