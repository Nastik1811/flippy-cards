import React from 'react'
import styles from './Loader.module.scss'

const Loader = () => {
    return(
        <div className={styles["container"]}>
                 <div className={styles["animation-container"]}>
                <div className={styles["animation-group"]}>
                    <span className={styles["component"]}></span>
                    <span className={styles["component"]}></span>
                    <span className={styles["component"]}></span>
                    <span className={styles["component"]}></span>
                </div>
            </div>
        </div>
    )
}

export default Loader;