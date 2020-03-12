import React from 'react'
import ReactDOM from 'react-dom'
import CardPreview from '../Components/CardPreview'

export default class CollectionEditor extends React.Component {
    render() {
        return (
            <>
                <div className="edit-collection">
                    <header>
                        <h1 contentEditable="true" className="collection-name">Collection name</h1>
                    </header>
                    <div className="cards-board">
                        <CardPreview/>
                        <CardPreview/>
                        <CardPreview/>
                        <CardPreview/>
                        <CardPreview/>
                    </div>
                </div>
                
            </>
        )
    }
}