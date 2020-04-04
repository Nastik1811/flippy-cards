import React from 'react'
import styles from './Card.module.scss'

const Card = ({card, isFlipped, onClick}) => {

    return (
        <div className={isFlipped? styles["flipped-card"] : styles["card"]} onClick={onClick}>
            
            <div className={styles["card-front"]}>{card.front}
            </div>
            <div className={styles["card-back"]}>{card.back}
            </div>
            <span className={styles["card-caption"]}>Click to flip</span>
        </div>
    )
}

export default Card;