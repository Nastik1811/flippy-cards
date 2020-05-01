import React from 'react'
import styles from './SideView.module.scss'
import clsx from 'clsx';

const SideView = ({caption, className, children}) => {
    return(
      <div className={clsx(styles["container"], styles[className])}>
            <header className={styles["caption"]}>
                <span>{caption}</span>
            </header>
            <section className={styles["content"]}>
              {children}
            </section>
        </div>
    )
  }

export default SideView
