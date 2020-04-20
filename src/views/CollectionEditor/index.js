import React, { useState, useContext, useEffect } from 'react'
import CardItem from './CardItem'
import { useParams } from 'react-router-dom'
import styles from './CollectionEditor.module.scss'
import { DataContext } from '../../DataManger'

const CheckablePreview = ({children}) => {
    return(<div>
        {children}
    </div>)
} 

const CollectionEditor = () => {

    let {slug} = useParams();
    const {manager} = useContext(DataContext);
    const [collection, setCollection] = useState(null);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function fetchData(){
            await manager.getCards(slug).then(data => setCards(data));
        }
        fetchData();
    }, [manager, slug])

    useEffect(() => {
        async function fetchData(){
            await manager.getCollection(slug).then(data => setCollection(data));
        }
        fetchData();
     }, [manager, slug])
    
    return (
        <>
            <div className={styles["editor"]}>
                <header>
                    <h1 className={styles["name"]}>{collection? collection.name: "" }</h1>
                    <button className={styles["save-btn"]}> Save</button>
                </header>
                <div className={styles["scroll"]}>
                    <div className={styles["cards"]}>
                        {cards.map(c => <CardItem front={c.content.front} back={c.content.back} key={c.id}/>)}
                    </div>
                </div>
            </div>
            
        </>
    )
  
}

export default CollectionEditor