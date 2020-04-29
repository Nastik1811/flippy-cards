import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CollectionPreview.module.scss'

const CollectionPreview = ({collection}) => {
    return(
        <Link to={`/collection/${collection.id}`}>
            <div className={styles["collection-preview"]}>
                    <header className={styles["header"]}>
                        <div className={styles["title"]}>{collection.name}</div>
                    </header>
                    <div className={styles["details"]}></div>
                    <footer className={styles["footer"]}>{collection.created.toDate().toLocaleString()}</footer>
            </div>
        </Link>
        
    )
}

export default CollectionPreview;