import React from 'react'
import styles from './EditorWindow.module.scss'

const EditorWindow = ({caption, children, onReturn}) => {
    return(
        <div className={styles["editor"]}>
            <header className={styles["header"]}>
                <span className={styles["caption"]}>{caption}</span>
                <button onClick={onReturn} className={styles["back"]}></button>
                <hr className={styles["hr"]}/>
            </header>
            
            <div className={styles["content"]}>
                {children}
            </div>
        </div>
    )
  }

  export default EditorWindow