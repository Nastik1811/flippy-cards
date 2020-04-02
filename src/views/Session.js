import React, {useState, useEffect} from 'react'
import Card from '../components/Card'
import {collections, getCards} from "../DummyData"
import {useParams} from 'react-router-dom'

const SessionInfo = ({name, left}) => {
    return (
        <div className="session-info">
            <div>
                <div className="title">{name}</div>
                <div className="detail">{left} cards left</div>
            </div>
            <Timer time = "0:20"/>
        </div>
    )
}

const Timer = ({time}) => {
    return(<div className="passed-time"> {time}</div>)
}

const Session = () => {
    let {slug} = useParams();
    let cards = slug ? collections[slug].cards : getCards();
    let collectionName = slug ? collections[slug].name : "All cards"
    
    const [currentCardIndex, setCardIndex] = useState(0);
    const [isFlipped, setFlipped] = useState(false);
    const [left, setLeft] = useState(cards.length - 1);
    
    useEffect(() => {}, []);

    const handleClick = () => {
        if(left !== 0 ){
            setFlipped(false);
            setCardIndex(currentCardIndex + 1);
            setLeft(left - 1);
        }
        else{
            alert("It is the last card. Please return to home.")
        }
    }

    return (
            <div>
                <SessionInfo name={collectionName} left = {left} />
                <Card card={cards[currentCardIndex]} onClick={() => setFlipped(true)} isFlipped={isFlipped}/>
                <div className={isFlipped? "buttons-panel": "buttons-panel hidden"} >
                    <button className="" onClick={handleClick}>Fail</button>
                    <button className="" onClick={handleClick}>Win</button>
                </div>
            </div>
        )
}

export default Session;