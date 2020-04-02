import React from 'react'
import styles from './CardPreview.module.scss'

const CardPreview = ({front, back}) => {
    return(
        <div className={styles["card-preview"]}>
            <div className={styles["back"]}>
                <p className={styles["detail"]}>
                    {back}
                </p> 
            </div>
            <div className={styles["front"]}>
                <p className={styles["detail"]}>
                    {front}
                </p> 
            </div>
        </div>
    )
}

export default CardPreview;