import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CollectionPreview.module.scss'

const CollectionPreview = ({slug, name, created}) => {
    return(
        <Link to={`/collection/${slug}`}>
            <div className={styles["collection-preview"]}>
                    <header className={styles["header"]}>
                        <div className={styles["title"]}>{name}</div>
                    </header>
                    <div className={styles["details"]}></div>
                    <footer className={styles["footer"]}>Created 12.03.2020 </footer>
            </div>
        </Link>
        
    )
}

export default CollectionPreview;