import React, { useState } from 'react'
import CardItem from './CardItem'
import { useParams } from 'react-router-dom'
import { collections } from '../../DummyData'
import styles from './CollectionEditor.module.scss'

const CheckablePreview = ({children}) => {
    return(<div>
        {children}
    </div>)
} 

const CollectionEditor = () => {

    let {slug} = useParams();
    let collection = collections[slug];
    
    let cards = collection.cards.map(c => <CheckablePreview><CardItem front={c.front} back={c.back}/></CheckablePreview>)
        return (
            <>
                <div className={styles["editor"]}>
                    <header>
                        <h1 contentEditable="true" className={styles["name"]}>{collection.name}</h1>
                    </header>
                    <div className={styles["cards"]}>
                        {cards}
                    </div>
                </div>
                
            </>
        )
  
}

export default CollectionEditor