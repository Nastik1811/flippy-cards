import React from 'react'
import styles from './CardItem.module.scss'

const CardItem = ({front, back}) => {
    return(
        <div className={styles["card-item"]}>
            <div className={styles["back"]}>
                {back}
            </div>
            <div className={styles["front"]}>
                {front}
            </div>
        </div>
    )
}

export default CardItem;