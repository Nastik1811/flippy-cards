import React from 'react'
import ReactDOM from 'react-dom'
import CardPreview from '../Components/CardPreview'
import { useParams } from 'react-router-dom'
import { collections } from '../DummyData'

const CollectionEditor = () => {

    let {slug} = useParams();
    let collection = collections[slug];
    
    let cards = collection.cards.map(c => <CardPreview front={c.front} back={c.back}/>)
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