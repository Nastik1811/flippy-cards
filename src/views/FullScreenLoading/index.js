import React from 'react'
import styles from './Loading.module.scss'
import clsx from 'clsx'


const FullScreenLoading = () => {
    return(
        <div className={clsx(styles["window"], "cloud-background")}>
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

export default FullScreenLoading