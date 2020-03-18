import React, { useContext } from 'react'
import CollectionReviewLink from '../Components/CollectionReviewLink'
import { AuthContext } from '../Auth'
import {collections} from "../DummyData"
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

const ReviewInvitation = () => {
    const {currentUser} = useContext(AuthContext);
    return (
        <div className="home-greetings">
            <GreetingMsg userName="Anastasia"/>
            <InvitationMsg/>
            <button className="accent-btn" id="quick-start-btn">Start now</button>
    </div>
    )
}

const CollectionPicker = props => {
    let links = collections.map((c, i) => <CollectionReviewLink slug={i} name={c.name} cards={c.cards.length}/>)
    return (
        <section>
            <header className="section-header">You can also choose a collection:</header>
            <div className="grid-container">
                {links}
                <div className="preview-container">
                    <Link to="/manage"><button className="accent-btn" id="to-manage-btn">Manage <wbr/> collections</button></Link>
                </div>
            </div>
        </section>
    )
}

const Statistics = () => {
    return (
        <section>
            <header className="section-header" >User's statistics will be there.</header>
        </section>
    )
}

const Home = () => { 
    let container = document.querySelector(".app-container");
    return(
        <>
            <section className="home-main">
                <button id="add-card-btn" className="accent-btn" onClick={() => {container.classList.toggle("cloud-background")}}> Add card</button>
                <ReviewInvitation/>
            </section>
            <CollectionPicker/>
            <Statistics/>
        </>
    );
}

export default Home;