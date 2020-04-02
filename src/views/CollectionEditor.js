import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import CardPreview from '../components/CardPreview'
import { useParams } from 'react-router-dom'
import { collections } from '../DummyData'

const CheckablePreview = ({children}) => {
    return(<div>
        {children}
    </div>)
} 

const CollectionEditor = () => {

    let {slug} = useParams();
    let collection = collections[slug];
    
    let cards = collection.cards
        return (
            <>
                <div className="edit-collection">
                    <header>
                        <h1 className="collection-name">{collection.name}</h1>
                    </header>
                    <div className="cards-board">
                        {cards.map(c => <CheckablePreview><CardPreview front={c.front} back={c.back}/></CheckablePreview>)}
                    </div>
                </div>
                
            </>
        )
  
}

export default CollectionEditor