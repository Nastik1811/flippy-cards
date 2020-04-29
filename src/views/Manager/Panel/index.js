import React from 'react'
import styles from './Panel.module.scss'
import Loader from '../../../components/Loader'
import LinkButton from '../../../components/LinkButton'

const Panel = ({items, newItemUrl, children}) => {
    return items ?
        <div className={styles["panel"]}>
            <LinkButton url={newItemUrl}  className={styles["to_new"]} label="+"/>
            {items}
            {children}
        </div> : 
        <Loader/>
    
}

export default Panel