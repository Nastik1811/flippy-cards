import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ReviewLink.module.scss'


const ReviewLink = ({slug, name, cards}) => {
    return(
       
        <div className={styles["link-container"]}>
            <div className={styles["info-component"]}>
                <span className={styles["link-title"]}>{name}</span>
                <span className={styles["link-details"]}>{cards} cards to review</span>
            </div>

            <Link to={`/session/${slug}`}>
                <div className={styles["overlay-component"]}> Click to start </div>
            </Link>    
        </div>
       
    )
}

export default ReviewLink;