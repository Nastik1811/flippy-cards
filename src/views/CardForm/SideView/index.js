import React from 'react'
import styles from './SideView.module.scss'
import clsx from 'clsx';

const SideView = ({side, value, onChange}) => {
    return(
      <div className={clsx(styles["container"], styles[side])}>
            <header className={styles["caption"]}>
                <span>{side}</span>
            </header>
            <section className={styles["content"]}>
              <textarea value={value} placeholder={side} onChange={(e) => onChange(e.target.value)}/>
            </section>
        </div>
    )
  }

export default SideView
