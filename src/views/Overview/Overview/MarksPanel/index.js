import React from 'react'
import styles from './MarksPanel.module.scss'
import { MARK } from '../..'

const MarksPanel = ({onClick}) => {
    return(
    <div className={ styles["panel"]} >
        <button onClick={() => onClick(MARK.BAD)}><i className={styles["bad"]} /></button>
        <button onClick={() => onClick(MARK.GOOD)}><i className={styles["good"]} /></button>
        <button onClick={() => onClick(MARK.EXCELLENT)}><i className={styles["excellent"]} /></button>
    </div>)
}

export default MarksPanel;
