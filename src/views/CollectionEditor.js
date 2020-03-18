import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import CardPreview from '../Components/CardPreview'
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
    
    let cards = collection.cards.map(c => <CheckablePreview><CardPreview front={c.front} back={c.back}/></CheckablePreview>)
        return (
            <>
                <div className="edit-collection">
                    <header>
                        <h1 contentEditable="true" className="collection-name">{collection.name}</h1>
                    </header>
                    <div className="cards-board">
                        {cards}
                    </div>
                </div>
                
            </>
        )
  
}

export default CollectionEditor