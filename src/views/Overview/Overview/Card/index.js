import React from 'react'
import styles from './Card.module.scss'
import clsx from 'clsx'

const Card = ({card, isFlipped, onClick, isNew}) => {

    return (
        <div className={clsx(styles["card-container"], { [styles["new"]]: isNew })}>
            <div className={clsx(styles["card"], { [styles["flipped"]]: isFlipped } )} onClick={onClick}>
                <div className={styles["card-front"]}>
                    <span className={styles["content"]} >
                        {card.front}
                    </span>
                </div>
                <div className={styles["card-back"]} >
                    <span className={styles["content"]} >
                        {card.back}
                    </span>
                </div>
                <span className={styles["card-caption"]}>Click to flip</span>
            </div>
        </div>
    )
}

export default Card;