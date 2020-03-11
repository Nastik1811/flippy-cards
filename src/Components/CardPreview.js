import React from 'react'
const CardPreview = () => {
    return(
        <div className="preview-container overlay">
            <div className="preview-component card-preview-back">
                Back side of card
            </div>
            <div className="preview-component card-preview-front">
                Front side of card
            </div>
        </div>
    )
}

export default CardPreview;