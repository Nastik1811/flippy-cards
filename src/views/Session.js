import React, {useState, useEffect} from 'react'
import Card from '../Components/Card'
import {collections} from "../DummyData"

export const SessionInfo = ({name}) => {
    return (
        <div className="session-info">
            <div>
                <div className="title">{name}</div>
                <div className="detail"> 15 cards left </div>
            </div>
            <div className="passed-time"> 10:10 </div>
        </div>
    )
}

export const Timer = () => {
    let [state, setState] = useState(0);
    return(<div className="detail"> 15 cards left </div>)
}

const Session = () => {
    let collection = collections[0]
    let [currentCard, setCurrentCard] = useState(collection.cards[0]);
    useEffect(() => {}, []);
    return (
            <div>
                <SessionInfo name={collection.name}/>
                <Card card={currentCard}/>
            </div>
        )
}

export default Session;