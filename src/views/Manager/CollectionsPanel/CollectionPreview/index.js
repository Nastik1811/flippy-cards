import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CollectionPreview.module.scss'

const CollectionPreview = ({collection}) => {
    const edited = collection.last_edit.toDate().toLocaleDateString('en-EN', {year: 'numeric', month: 'long', day: 'numeric' });

    return(
        <Link to={`/collection/${collection.id}`}>
            <div className={styles["collection-preview"]}>
                    <header className={styles["header"]}>
                        <div className={styles["title"]}>{collection.name}</div>
                    </header>
                    <div className={styles["details"]}></div>
                    <footer className={styles["footer"]}>{edited}</footer>
            </div>
        </Link>
        
    )
}

export default CollectionPreview;