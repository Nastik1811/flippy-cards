import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Auth'
import { Link } from 'react-router-dom'

const GreetingMsg = props => {
    
    return (
        <div id="greeting-message" >
            Hello, {props.userName}!
        </div>
    )
}

const InvitationMsg = props => {

    return (
        <div id="invitation-message" >
            You have something to reapet. Your cards are awaiting you.. Let’s start learning!
        </div>
    )
}

const Invitation = () => {
    const {currentUser} = useContext(AuthContext);
    return (
        <div className="home-greetings">
            <GreetingMsg userName="Anastasia"/>
            <InvitationMsg/>
            <Link to="/session" className="accent-btn medium" id="quick-start-btn">Start now</Link>
    </div>
    )
}

export default Invitation