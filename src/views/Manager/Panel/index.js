import React from 'react'
import styles from './Panel.module.scss'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader'

const Panel = ({children, pathToNew}) => {
    return children ?
        <div className={styles["panel"]}>
            <Link to={pathToNew}  className={styles["to_new"]}> + </Link>
            {children}
        </div> : 
        <Loader/>
    
}

export default Panel