import React, {useState, useEffect, useContext} from 'react'
import {useParams, Redirect, useHistory} from 'react-router-dom'
import Loader from "../../components/Loader"
import Overview from './Overview'
import Modal, { ModalMessage, ModalContent, ModalActions } from '../../components/Modal'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/AuthContext'


export const MARK = {
    BAD: 'bad',
    GOOD:'good',
    EXCELLENT: 'excellent'
}

const OverviewContainer = () => {
    const {slug} = useParams()
    const {token} = useContext(AuthContext)
    const {request} = useHttp(token)
    const  history = useHistory()
    const [cards, setCards] = useState(null);
    const [currentCardIndex, setCardIndex] = useState(0);
    const [time, setTime] = useState(0);
    const [showCongrats, setShowCongrats] = useState(false);

    useEffect(()=> {
        const fetchCards = async () => {
            const data = await request(`/api/cards?needReview=true&collection_id=${slug ? slug : ""}`)
            if(data.length){
                throw new Error({message: "There is no cards to repeat."})
            }
            setCards(data.cards)
            
        }
        try{
            fetchCards()
        }catch(e){
            alert(e.message);
        }
    }, [slug])

    useEffect(() =>{
        setInterval(() => setTime(c => c + 1), 1000);
        return clearInterval
    }, [])

    const handleMarkClick = async (mark) => {
        request('/api/cards', PUT, {})
        // manager.updateCardProgress(cards[currentCardIndex], mark)
        if(currentCardIndex !== cards.length - 1){
            setCardIndex(currentCardIndex + 1);
        }
        else{
            setShowCongrats(true)
        }
    }

    const updateCardProgress = async (id, newStatus, nextReviewDate) => {
        request(`/api/cards/${id}`, PUT, {
            newStatus, nextReviewDate
        })
    }

    const finishReview = () => history.push('/home')

    if(!cards){
        return <Loader/>
    }
    if(showCongrats){
        return(
            <Modal onDismiss={finishReview}>
                <ModalContent>
                    <ModalMessage>That's all. Good job!</ModalMessage>
                <div className="session-over-img"></div>

                </ModalContent>
                <ModalActions>
                    <button onClick={finishReview}>Got it!</button>
                </ModalActions>
            </Modal>
        )
    }
    return (
            <Overview
                name={"All cards"}
                currentCard = {cards[currentCardIndex]}
                onMarkClick ={handleMarkClick}
                left = {cards.length - currentCardIndex}
                time = {time}
                onTick = {setTime}
            />)
            
}

export default OverviewContainer;