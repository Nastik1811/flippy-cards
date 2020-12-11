import React, {useState, useEffect} from 'react'
import {useParams, Redirect} from 'react-router-dom'
import Loader from "../../components/Loader"
import Overview from './Overview'
import Modal, { ModalMessage, ModalContent, ModalActions } from '../../components/Modal'

const OverviewContainer = () => {
    const {slug} = useParams();


    const collection_id = slug ? slug : null;

    const [cards, setCards] = useState(null);
    const [currentCardIndex, setCardIndex] = useState(0);
    const [left, setLeft] = useState(0);
    const [time, setTime] = useState(0);
    const [isOver, setIsOver] = useState(false);
    const [showCongrats, setShowCongrats] = useState(false);

    useEffect(()=> {
        // manager.getCardsToRecall(collection_id).then(data => {
        //     if(data.length !== 0){
        //         setCards(data);
        //         return data;
        //     } else{
        //         throw Error;
        //     }
        // })
        // .then(data => setLeft(data.length - 1))
        // .catch(() => {
        //     alert("There is no cards to repeat.");
        //     setIsOver(true)
        // })
    }, [ collection_id])

    useEffect(() =>{
        setInterval(() => setTime(c => c + 1), 1000);
    }, [])

    const handleMarkClick = (mark) => {
        // manager.updateCardProgress(cards[currentCardIndex], mark)
        // if(left !== 0 ){
        //     setLeft(left - 1);
        //     setCardIndex(currentCardIndex + 1);
        // }
        // else{
        //     setShowCongrats(true)
        // }
    }

    if(isOver){
        return <Redirect to="/home"/>
    }

    if(!cards){
        return <Loader/>
    }
    return !showCongrats?
            <Overview
                name={collection_id ? cards[0].collection.name : "All cards"}
                currentCard = {cards[currentCardIndex]}
                onMarkClick ={handleMarkClick}
                left = {left}
                time = {time}
                onTick = {setTime}
            />
            : <Modal onDismiss={() => setIsOver(true)}>
                <ModalContent>
                    <ModalMessage>That's all. Good job!</ModalMessage>
                <div className="session-over-img"></div>

                </ModalContent>
                <ModalActions>
                    <button onClick={() => setIsOver(true)}>Got it!</button>
                </ModalActions>
            </Modal>
        
}

export default OverviewContainer;