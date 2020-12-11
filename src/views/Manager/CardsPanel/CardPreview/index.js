import React from 'react'
import styles from './CardPreview.module.scss'
import { Link } from 'react-router-dom';

const CardPreview = ({card, onDelete}) => {
    return(
            <div className={styles["card-preview"]}>
                <header className={styles["controls"]}> 
                    <Link to={`/card/${card.id}`} className={styles["edit"]}></Link> 
                    <button className={styles["delete"]} onClick={onDelete}></button> 
                </header>
                <section className={styles["detail"]}>
                        <p>{card.front}</p>
                </section>
                <footer className={styles["footer"]}></footer>
            </div>
        
    )
}

export default CardPreview;