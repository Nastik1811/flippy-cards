import React from 'react'
import styles from './CardPreview.module.scss'
import { Link } from 'react-router-dom';

const CardPreview = ({card}) => {
    return(
        <Link to={`/card/${card.id}`}>
            <div className={styles["card-preview"]}>
                <div className={styles["detail"]}>
                    <span >
                        {card.content.front}
                    </span> 
                </div>
            </div>
        </Link>
        
    )
}

export default CardPreview;