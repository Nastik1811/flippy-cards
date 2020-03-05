import React from 'react'
import CollectionPreview from './CollectionPreview'
import CardPreview from './CardPreview'

const CollectionPreviewsContainer = () => {
    return(
        <div className="previews-container">
            <CollectionPreview/>
            <CollectionPreview/>
            <CollectionPreview/>
            <CardPreview/>
            <CardPreview/>
            <CardPreview/>
            <CardPreview/>
        </div>
    )
}

export default CollectionPreviewsContainer;