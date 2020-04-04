import React from 'react'
import styles from './CardPreview.module.scss'

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