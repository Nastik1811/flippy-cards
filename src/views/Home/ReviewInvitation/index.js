import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ReviewInvitation.module.scss'
import { DataContext } from '../../../DataManger'

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
    const {manager} = useContext(DataContext);

    // do I really need hooks here?
    const [userName, setUserName] = useState(null);

    //what is the difference between next two ways of setting user name?
    //manager.getUserName().then(name => setUserName(name));

    //It's all bad. I'm trying to get value from firestore after every re-render that is really notable
    React.useEffect(() => {
        manager.getUserName().then(name => setUserName(name));
    }, [manager]) 
    

    return (
        <div className={styles["greeting"]}>
            <InvitationMsg  userName={userName}/>
            <Link to="/session" className={styles["start-btn"]}>Start now</Link>
        </div>
    )
}

export default ReviewInvitation