import React from 'react'
const CardPreview = ({front, back}) => {
    return(
        <div className="preview-container overlay">
            <div className="preview-component card-preview-back">
                {back}
            </div>
            <div className="preview-component card-preview-front">
                {front}
            </div>
        </div>
    )
}

export default CardPreview;