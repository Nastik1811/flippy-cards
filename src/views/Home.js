import React from 'react'
import CollectionReviewLink from '../Components/CollectionReviewLink'


const GreetingMsg = props => {
    return (
        <div id="greeting-message" >
            Hello, {props.userName}
        </div>
    )
}

const InvitationMsg = props => {
    let msg = "It seems you have something to repeat. <strong> 15 cards in 4 collections. </strong> <br/> Let’s start learning";
    return (
        <div id="invitation-message" >
            It seems you have something to repeat. <strong> 15 cards in 4 collections. </strong> <br/> Let’s start learning
        </div>
    )
}

const ReviewInvitation = () => {
    return (
        <div className="home-greetings">
            <GreetingMsg userName="Anastasia"/>
            <InvitationMsg/>
            <button  className="btn" id="quick-start-btn">Let’s start</button>
    </div>
    )
}

const CollectionPicker = props => {
    let collections = [<CollectionReviewLink/>,<CollectionReviewLink/>, <CollectionReviewLink/>, <CollectionReviewLink/>, <CollectionReviewLink/> ];
    return (
        <section>
            <header className="section-header">Pick the collection</header>
            <div className="flex-container">
                {collections}
                <button className="btn" id="to-manage-btn">Manage <wbr/> collections</button>
            </div>
        </section>
    )
}

const Statistics = () => {
    return (
        <section>
            <header>User's statistics will be there.</header>
        </section>
    )
}

const Home = () => { 
    return(
        <>
            <div className="quick-actions-container">
                <button id="add-card-btn" className="btn" >Add new card</button>
                <ReviewInvitation/>
            </div>
            <CollectionPicker/>
            <Statistics/>
        </>
    );
}

export default Home;