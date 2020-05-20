import React, { useState, useEffect, useContext } from 'react'
import CardPreview from './CardPreview'
import { DataContext } from '../../../DataManger'
import Panel from '../Panel'
import ConfirmationDialog from './ConfirmationDialog'

const CardsPanel = () => {
    const {manager} = useContext(DataContext);
    const [cards, setCards] = useState(null);
    const [confirmationDetails, setConfirmationDetails] = useState({
        isOpen: false,
        card: null
    })

    useEffect(() => {
        let unsubscribe = manager.listenCards(setCards)
        return unsubscribe;
    }, [manager]
    )

    const confirmDelete = card => {
        setConfirmationDetails({
            isOpen:true, 
            card
        })
    }

    const handleDelete = () => {
        manager.deleteCard(confirmationDetails.card.id)
        closeConfirmation()
    }

    const closeConfirmation = () => {
        setConfirmationDetails(
            {
                isOpen: false,
                card: null
            }
        )
    }

    return(<>
            <Panel newItemUrl={"/card/new"}> 
                {cards ? 
                    cards.map(c => <CardPreview card={c} key={c.id} onDelete={() => confirmDelete(c)}/>) 
                    : null}
            </Panel>
            <ConfirmationDialog 
                isOpen={confirmationDetails.isOpen} 
                collection={confirmationDetails.card} 
                onDismiss={closeConfirmation} 
                onConfirm={handleDelete} 
            />
        </>
        )
}


export default CardsPanel