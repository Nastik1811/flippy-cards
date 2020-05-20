import React from 'react'
import styles from './Modal.module.scss'


const Modal = ({onDismiss, children}) => {
    return(
        <div className={styles["window"]} onClick={onDismiss}>
            <div className={styles["modal"]} onClick={ e => e.stopPropagation()}>
                    {children}
            </div>
        </div>
    )
}

export const ModalContent = ({children}) => {
    return(
        <section className={styles["content"]}>
            <div className={styles["container"]}>
                {children}
            </div>
        </section>
    )

}

export const ModalActions = ({children}) => {
    return(
        <section className={styles["actions"]}>
            {children}
        </section>
    )
}

export const ModalHeader = ({title}) => {
    return(
        <header className={styles["header"]}>
            <h3 className={styles["title"]}>{title}</h3>
            <hr className={styles["hr"]}></hr>
        </header>
    )
}

export const ModalMessage = ({children}) => {
    return(
        <p className={styles["message"]}>
            {children}
        </p>
    )
}

export const ModalCheckbox = ({label, onChange, checked}) => {
    return(
        <section className={styles["checkbox"]}>
            <input
                id="ch"
                type="checkbox" 
                checked={checked} 
                onChange={onChange}
                />
            <label htmlFor="ch"> {label}</label>
        </section>
        
    )
}

export default Modal