import React from 'react'
import styles from './CardPreview.module.scss'

const CardPreview = ({card}) => {
    return(
        <div className={styles["card-preview"]}>
            <div className={styles["back"]}>
                <p className={styles["detail"]}>
                    {card.content.back}
                </p> 
            </div>
            <div className={styles["front"]}>
                <p className={styles["detail"]}>
                    {card.content.front}
                </p> 
            </div>
        </div>
        
    )
}

export default CardPreview;