import React, {useState, useEffect, useContext} from 'react'
import Card from './Card'
import {useParams} from 'react-router-dom'
import styles from './Overview.module.scss'
import { DataContext, MARK } from '../../DataManger'
import Loader from "../../components/Loader"

const SessionInfo = ({name, left}) => {
    return (
        <div className={styles["session-info"]}>
            <div className={styles["details"]}>
                <div className={styles["title"]}>{name}</div>
                <div className={styles["left"]}>{left} cards left</div>
            </div>
        </div>
    )
}

const Timer = ({time}) => {
    return(<div className={styles["passed-time"]}> {time}</div>)
}

const Overview = ({history}) => {
    const {slug} = useParams();
    const {manager} = useContext(DataContext);

    const collection_id = slug ? slug : null;
    
    const [cards, setCards] = useState(null);
    const [currentCardIndex, setCardIndex] = useState(0);
    const [isFlipped, setFlipped] = useState(false);
    const [left, setLeft] = useState(0);

    useEffect(()=> {
        manager.getCardsToRecall(collection_id).then(data => {
            if(data.length !== 0){
                setCards(data);
                return data;
            }else{
                throw Error;
            }
        })
        .then(data => setLeft(data.length - 1))
        .catch(() => {
            alert("There is no cards to repeat.");
            history.push('/home');
        })
    }, [manager, collection_id, history])

    
    const handleClick = (mark) => {
        manager.updateCardProgress(cards[currentCardIndex], mark)

        if(left !== 0 ){
            setFlipped(false);
            setCardIndex(currentCardIndex + 1);
            setLeft(left - 1);
        }
        else{
            alert("That's all. Good job!");
            history.push('/home');
        }
    }

    return (
        cards?
            <section className={styles["overview"]}>
                <div className={styles["container"]}>
                    <SessionInfo name={collection_id ? cards[0].collection.name : "All cards"} left = {left} />
                    <Card card={cards[currentCardIndex].content} onClick={() => setFlipped(true)} isFlipped={isFlipped}/>
                    <div className={ isFlipped? styles["buttons-panel"]: styles["buttons-panel-hidden"]} >
                        <button className="" onClick={() => handleClick(MARK.BAD)}>Fail</button>
                        <button className="" onClick={() => handleClick(MARK.GOOD)} >Deal</button>
                        <button className="" onClick={() => handleClick(MARK.EXCELLENT)} >Win</button>
                    </div>
                </div>
            </section>
            :
            <Loader/>
        )
}

export default Overview;