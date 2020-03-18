import React, {useState, useEffect} from 'react'
import Card from '../Components/Card'
import {collections} from "../DummyData"
import {
    useParams
  } from 'react-router-dom'

export const SessionInfo = ({name, left}) => {
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

export const Timer = ({time}) => {
    return(<div className="passed-time"> {time}</div>)
}

const Session = () => {
    let {slug} = useParams();
    let collection = collections[slug];
    const [currentCardIndex, setCardIndex] = useState(0);

    useEffect(() => {}, []);

    return (
            <div>
                <SessionInfo name={collection.name} left = {collection.cards.length - currentCardIndex - 1} />
                <Card card={collection.cards[currentCardIndex]}/>
                <button onClick={() => setCardIndex(currentCardIndex + 1)}>Next card</button>
            </div>
        )
}

export default Session;