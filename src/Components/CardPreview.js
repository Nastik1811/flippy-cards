import React from 'react'
const CardPreview = ({front, back}) => {
    return(
        <div className="preview-container overlay">
            <div className="preview-component card-preview-back">
                <p className="preview-info">
                    {back}
                </p>   
            </div>
            <div className="preview-component card-preview-front">
                <p className="preview-info">
                    {front}
                </p>
            </div>
        </div>
    )
}

export default CardPreview;