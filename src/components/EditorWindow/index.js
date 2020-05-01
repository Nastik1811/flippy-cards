import React from 'react'
import styles from './EditorWindow.module.scss'

const EditorWindow = ({caption, children}) => {
    return(
      <div className={styles["window"]}>
        <div className={styles["editor"]}>
            <header className={styles["header"]}>
                <span className={styles["caption"]}>{caption}</span>
                <hr/>
            </header>
            
            <div className={styles["content"]}>
                {children}
            </div>
        </div>
      </div>
    )
  }

  export default EditorWindow