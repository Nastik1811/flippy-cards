import React from 'react'
import styles from './ItemsGrid.module.scss'
import Loader from '../../../components/Loader'
import LinkButton from '../../../components/LinkButton'

const ItemsGrid = ({newItemUrl, children}) => {
    return children ?
        <div className={styles["panel"]}>
            <LinkButton url={newItemUrl}  className={styles["to_new"]} label="+"/>
            {children}
        </div> : 
        <Loader/>
    
}

export default ItemsGrid