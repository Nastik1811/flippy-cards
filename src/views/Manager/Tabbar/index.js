import React from 'react'
import styles from './Tabbar.module.scss'
import { NavLink } from 'react-router-dom'


export const Tab = ({url, label}) => {
    return(
        <NavLink to={url} className={styles["tab"]} activeClassName={styles["tab-active"]} >{label}</NavLink>
    )
} 
const Tabbar = ({children}) => 
{
    return (
        <nav className={styles["tabbar"]}>
            {children}
        </nav>
    )
}

export default Tabbar