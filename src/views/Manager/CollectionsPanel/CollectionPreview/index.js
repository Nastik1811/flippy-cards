import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CollectionPreview.module.scss'
const CollectionPreview = ({collection, onDelete}) => {
    const edited = collection.last_edit.toDate().toLocaleDateString('en-EN', {year: 'numeric', month: 'long', day: 'numeric' });

    return(
            <div className={styles["collection-preview"]}>
            <header className={styles["controls"]}> 
                <Link to={`/collection/${collection.id}`} className={styles["edit"]}></Link> 
                <button className={styles["delete"]} onClick={onDelete}></button> 
            </header>
            <section className={styles["detail"]}>
                {collection.name}
            </section>
            <footer className={styles["footer"]}>{edited}</footer>
        </div>
        
    )
}

export default CollectionPreview;