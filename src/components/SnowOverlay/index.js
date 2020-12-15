import React from 'react'
import styles from './snow.module.scss'

const SnowOverlay = () => {
    return(
        <div className={styles["snow"]}>
            <div className={styles["snow__level--near"]}></div>
            <div className={styles["snow__level--near--alt"]}></div>
            <div className={styles["snow__level--mid"]}></div>
            <div className={styles["snow__level--mid--alt"]}></div>
            <div className={styles["snow__level--far"]}></div>
            <div className={styles["snow__level--far--alt"]}></div>
        </div>
    )
}

export default SnowOverlay