import React, {useState, useEffect, useContext, useCallback} from 'react'
import {useParams} from 'react-router-dom'
import { DataContext } from '../../DataManger'
import Loader from "../../components/Loader"
import Overview from './Overview'

const OverviewContainer = ({history}) => {
    const {slug} = useParams();
    const {manager} = useContext(DataContext);

    const collection_id = slug ? slug : null;

    const [cards, setCards] = useState(null);
    const [currentCardIndex, setCardIndex] = useState(0);
    const [left, setLeft] = useState(0);
    const [time, setTime] = useState(0);

    useEffect(()=> {
        manager.getCardsToRecall(collection_id).then(data => {
            if(data.length !== 0){
                setCards(data);
                return data;
            } else{
                throw Error;
            }
        })
        .then(data => setLeft(data.length - 1))
        .catch(() => {
            alert("There is no cards to repeat.");
            history.push('/home');
        })
    }, [manager, collection_id, history])

    useEffect(() =>{
        setInterval(() => setTime(c => c + 1), 1000);
    }, [])

    const handleMarkClick = (mark) => {
        manager.updateCardProgress(cards[currentCardIndex], mark)

        if(left !== 0 ){
            setLeft(left - 1);
            setCardIndex(currentCardIndex + 1);
        }
        else{
            alert("That's all. Good job!");
            history.push('/home');
        }
    }

    return cards?
            <Overview
                name={collection_id ? cards[0].collection.name : "All cards"}
                currentCard = {cards[currentCardIndex]}
                onMarkClick ={handleMarkClick}
                left = {left}
                time = {time}
                onTick = {setTime}
            />
            :
            <Loader/>
        
}

export default OverviewContainer;