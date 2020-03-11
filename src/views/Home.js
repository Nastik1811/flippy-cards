import React from 'react'
import CollectionReviewLink from '../Components/CollectionReviewLink'


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
    return (
        <div className="home-greetings">
            <GreetingMsg userName="Anastasia"/>
            <InvitationMsg/>
            <button className="accent-btn" id="quick-start-btn">Start workout</button>
    </div>
    )
}

const CollectionPicker = props => {
    let collections = [<CollectionReviewLink/>,<CollectionReviewLink/>, <CollectionReviewLink/>, <CollectionReviewLink/>, <CollectionReviewLink/> ];
    return (
        <section>
            <header className="section-header">You can also choose a collection:</header>
            <div className="flex-container">
                {collections}
                <div className="preview-container">
                    <button className="accent-btn" id="to-manage-btn">Manage <wbr/> collections</button>
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
    return(
        <>
            <section className="home-main">
                <button id="add-card-btn" className="accent-btn" >+ Add card</button>
                <ReviewInvitation/>
            </section>
            <CollectionPicker/>
            <Statistics/>
        </>
    );
}

export default Home;