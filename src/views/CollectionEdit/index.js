import React, { useState, useContext, useEffect } from 'react'
import CardItem from './CardItem'
import { useParams } from 'react-router-dom'
import styles from './CollectionEditor.module.scss'
import { DataContext } from '../../DataManger'
import EditorWindow from '../../components/EditorWindow'
import { InputField } from '../../components/FormElements'

const CheckablePreview = ({children}) => {
    return(<div>
        {children}
    </div>)
} 

const CollectionEdit = () => {
    let {slug} = useParams();
    const {manager} = useContext(DataContext);

    const [name, setName] = useState("");
    const [checkedCards, setCheckedCards] = useState([]);
    const [uncheckedCards, setUncheckedCards] = useState([]);

    useEffect(() => {
        function fetchData(){
            manager.getCards(slug).then(setCheckedCards);
            manager.getCardsWithoutCollection().then(setUncheckedCards);
            manager.getCollection(slug).then(data => setName(data.name));
        }
        fetchData();
    }, [manager, slug])

    return (
        <EditorWindow caption="Collection editor">
            <header>
                <h1 className={styles["name"]}>{name}</h1>
            </header>
            <div className={styles["cards"]}>
                    {checkedCards.map(c => <CardItem content={c.content} key={c.id}/>)}
                    {uncheckedCards.map(c => <CardItem content={c.content} key={c.id}/>)}
            </div>
        </EditorWindow>
    )
  
}
//update collection name
//update all cards


export default CollectionEdit