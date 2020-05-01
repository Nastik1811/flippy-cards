import React from 'react'
import styles from './CardItem.module.scss'

const CardItem = ({content}) => {
    return(
        <div className={styles["card-item"]}>
            <div className={styles["back"]}>
                {content.back}
            </div>
            <div className={styles["front"]}>
                {content.front}
            </div>
        </div>
    )
}

export default CardItem;