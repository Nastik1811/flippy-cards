import React from 'react'
import styles from './CardItem.module.scss'
import clsx from 'clsx'

const Checkbox = ({isChecked}) => {
    return( <div 
                className={clsx(styles["checkbox"],  { [styles["checked"]]: isChecked })}
                >
    </div>)
}
const CardItem = ({card, isChecked, onClick}) => {
    return(
        <div className={clsx(styles["card-item"],  { [styles["checked"]]: isChecked })} onClick={onClick}>
            <div className={styles["back"]}>
                {card.content.back}
            </div>
            <div className={styles["front"]}>
                {card.content.front}
            </div>
            <Checkbox isChecked={isChecked} />
        </div>
    )
}

export default CardItem;