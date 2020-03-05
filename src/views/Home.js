import React from 'react'
import CollectionPreview from '../Components/CollectionPreview'


const Home = () => { 
    const previewStyle = {
        marginTop: "5vw"
    }
    return(
        <>
             <div className="wrapper">
                <button id="add-card-btn" className="btn" >Add new card</button>
                <div className="home-greetings">
                    <div id="greeting-message" >Hello, Anastasia!</div>
                    <div id="invitation-message" >It seems you have something to repeat. <strong>15 cards in 4 collections.</strong> <br/> Let’s start learning </div>
                    <button  className="btn" id="quick-start-btn">Let’s start</button>
                </div>
            </div>
            <div className="previews-container" style={previewStyle} >
                <CollectionPreview/>
                <CollectionPreview/>
                <CollectionPreview/>
                <CollectionPreview/>
                <CollectionPreview/>
                <button className="btn" id="to-manage-btn">Manage <wbr/> collections</button>
            </div>
        </>
    );
}

export default Home;