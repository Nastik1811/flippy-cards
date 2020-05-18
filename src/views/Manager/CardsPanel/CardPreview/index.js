import React, { useContext } from 'react'
import styles from './CardPreview.module.scss'
import { Link } from 'react-router-dom';
import { DataContext } from '../../../../DataManger';

const CardPreview = ({card}) => {
    const {manager} = useContext(DataContext);
    //const next_recall = card.next_recall.toDate().toLocaleDateString('en-EN', {year: 'numeric', month: 'long', day: 'numeric' });
    const onDelete = () => {
        manager.deleteCard(card.id)
    }
    return(
            <div className={styles["card-preview"]}>
                <header className={styles["controls"]}> 
                    <Link to={`/card/${card.id}`} className={styles["edit"]}></Link> 
                    {/* <Link to={`/manage/card/del/${card.id}`} className={styles["delete"]}></Link>  */}
                    <button className={styles["delete"]} onClick={onDelete}></button> 
                </header>
                <section className={styles["detail"]}>
                        <p>{card.content.front}</p>
                </section>
                <footer className={styles["footer"]}></footer>
            </div>
        
    )
}

export default CardPreview;