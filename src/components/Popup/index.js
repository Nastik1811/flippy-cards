import React from 'react'
import styles from './Popup.module.scss'

const Popup = ({children, className, onDismiss}) => {
    return(
        <div className={styles["window"]}>
            <div className={className}>
                <button onClick={onDismiss} className={styles["close"]}></button>
                {children}
            </div>
        </div>
    )
}

export default Popup