import React from 'react'
import styles from './Panel.module.scss'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader'

const Panel = ({items, newItemUrl, children}) => {
    return items ?
        <div className={styles["panel"]}>
            <Link to={newItemUrl}  className={styles["to_new"]}> + </Link>
            {items}
            {children}
        </div> : 
        <Loader/>
    
}

export default Panel