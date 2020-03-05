import React from 'react'
const CollectionPreview = () => {
    return(
        <div className="preview-container">
            <div className="preview collection-preview-main">
                <div className="preview-title">Collection Name</div>
                <div className="preview-details">20 cards total</div>
                <div className="preview-details">12 cards left</div>
            </div>
            <div className="preview collection-preview-overlay">Let's start!</div>
        </div>
    )
}

export default CollectionPreview;