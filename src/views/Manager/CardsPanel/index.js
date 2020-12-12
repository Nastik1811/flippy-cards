import React, { useState, useEffect, useContext } from 'react'
import CardPreview from './CardPreview'
import Panel from '../Panel'
import ConfirmationDialog from './ConfirmationDialog'
import ItemsGrid from '../ItemsGrid'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import Loader from '../../../components/Loader'


const CardsPanel = () => {
    const [cards, setCards] = useState(null);
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp(token)
   
    const [confirmationDetails, setConfirmationDetails] = useState({
        isOpen: false,
        card: null
    })

    useEffect(() => {
        const fetchCards = async () => {
            try{
                const data = await request('/api/cards')
                setCards(data.cards)
            }catch(e){
                console.error(e)
            }
        }
        fetchCards()
        // let unsubscribe = manager.listenCards(setCards)
        // return unsubscribe;
    }, []
    )

    const confirmDelete = card => {
        setConfirmationDetails({
            isOpen:true, 
            card
        })
    }

    const handleDelete = async () => {
        console.log('delete')
        try{
            //await???
            request(`/api/cards/${confirmationDetails.card.id}`, 'DELETE')
        }catch(e){
            alert(e)
        }finally{
            closeConfirmation()
        }
    }

    const closeConfirmation = () => {
        setConfirmationDetails(
            {
                isOpen: false,
                card: null
            }
        )
    }
    if(loading){
        return(
            <Loader/>
        )
    }
    return(<Panel>
            <ItemsGrid newItemUrl={"/card/new"}> 
                {cards ? 
                    cards.map(c => <CardPreview card={c} key={c.id} onDelete={() => confirmDelete(c)}/>) 
                    : null}
            </ItemsGrid>
            <ConfirmationDialog 
                isOpen={confirmationDetails.isOpen} 
                collection={confirmationDetails.card} 
                onDismiss={closeConfirmation} 
                onConfirm={handleDelete} 
            />
        </Panel>
        )
}


export default CardsPanel