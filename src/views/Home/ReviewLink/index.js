import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ReviewLink.module.scss'


const ReviewLink = ({slug, name, cards}) => {
    return(
        <Link to={`/session/${slug}`}>
        <div className={styles["link-component"]}>
            <div className={styles["info"]}>
                <span className={styles["title"]}>{name}</span>
                <span className={styles["details"]}>{cards} cards to review</span>
            </div>
            <div className={styles["link"]}> Review <br/> collection</div>
        </div>
        </Link> 
       
    )
}

export default ReviewLink;