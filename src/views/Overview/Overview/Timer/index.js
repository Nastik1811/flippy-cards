import React from 'react'
import styles from '../Overview.module.scss'

const Timer = ({time}) => {
    return(
    <div className={styles["time-container"]}> 
        <span className={styles["time"]}>{Math.floor((time / 60) % 60)}:{Math.floor(time % 60)}</span>
    </div>)
}

export default Timer;
