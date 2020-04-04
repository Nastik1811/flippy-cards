import React, {useState, useEffect} from 'react'
import Card from './Card'
import {collections} from "../../DummyData"
import {useParams} from 'react-router-dom'
import styles from './Overview.module.scss'

const SessionInfo = ({name, left}) => {
    return (
        <div className={styles["session-info"]}>
            <div>
                <div className={styles["title"]}>{name}</div>
                <div className={styles["detail"]}>{left} cards left</div>
            </div>
            <Timer time = "0:20"/>
        </div>
    )
}

const Timer = ({time}) => {
    return(<div className={styles["passed-time"]}> {time}</div>)
}

const Overview = () => {
    let {slug} = useParams();
    let collection = collections[slug];
    
    const [currentCardIndex, setCardIndex] = useState(0);
    const [isFlipped, setFlipped] = useState(false);
    const [left, setLeft] = useState(collection.cards.length - 1);
    
    useEffect(() => {}, []);

    const handleClick = () => {
        setFlipped(false);
        setCardIndex(currentCardIndex + 1);
        setLeft(left - 1);
    }

    return (
            <div>
                <SessionInfo name={collection.name} left = {left} />
                <Card card={collection.cards[currentCardIndex]} onClick={() => setFlipped(true)} isFlipped={isFlipped}/>
                <div className={ isFlipped? styles["buttons-panel"]: styles["buttons-panel-hidden"]} >
                    <button className="" onClick={handleClick}>Fail</button>
                    <button className="" onClick={handleClick}>Win</button>
                </div>
            </div>
        )
}

export default Overview;