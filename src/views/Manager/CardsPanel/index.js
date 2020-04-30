import React, { useState, useEffect, useContext } from 'react'
import CardPreview from './CardPreview'
import { DataContext } from '../../../DataManger'
import Panel from '../Panel'

const CardsPanel = () => {
    const {manager} = useContext(DataContext);
    const [cards, setCards] = useState(null);

    useEffect(() => {
        let unsubscribe = manager.listenCards(setCards)
        return unsubscribe;
    }, [manager]
    )

    return(
        <Panel 
            newItemUrl={"/card/new"}
            items = {cards ? cards.map(c => <CardPreview card={c} key={c.id} />) : null}
        />)
}


export default CardsPanel