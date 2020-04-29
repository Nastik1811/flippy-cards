import React, { useState, useEffect, useContext } from 'react'
import CardPreview from './CardPreview'
import { DataContext } from '../../../DataManger'
import Panel from '../Panel'

const CardsPanel = () => {
    const {manager} = useContext(DataContext);
    const [cards, setCards] = useState(null);

    useEffect(() => {
        let isSubscribed = true;
        manager.getCards().then(data => 
            {
                if(isSubscribed) setCards(data)}
            )
        return () => isSubscribed = false
    }, [manager]
    )

    return (
            <Panel pathToNew={"/card/new"}>
                {cards ? cards.map(c => <CardPreview card={c} key={c.id} />) : null}
            </Panel>)
}


export default CardsPanel