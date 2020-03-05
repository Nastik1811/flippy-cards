import React from 'react'


const Home = () => {
    return(
        <div className="main-container">
            <div className="container" id="main-actions-container">
                <button id="add-card-btn" className="btn" >Add new card</button>
                <hr/>
                <p className="text-center">It seems you have something to repeat. <strong>15 cards in 4 collections.</strong> <br/> Let’s start learning </p>
                <button  className="btn" id="review-all-btn">Review all</button>
                <p>You also could choose a collection. </p>
            </div>
        </div>
    );
}

export default Home;