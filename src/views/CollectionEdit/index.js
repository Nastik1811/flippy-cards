import React, { useState, useContext, useEffect } from 'react'
import CardItem from './CardItem'
import { useParams, Redirect } from 'react-router-dom'
import styles from './CollectionEditor.module.scss'
import { DataContext } from '../../DataManger'
import EditorWindow from '../../components/EditorWindow'
import Loader from '../../components/Loader'
import {SubmitButton, InputField} from '../../components/FormElements'


const CollectionEdit = () => {
    let {id} = useParams();
    const {manager} = useContext(DataContext);

    const [name, setName] = useState("");
    const [cards, setCards] = useState([]);
    const [cardStates, setCardStates] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [completed, setCompleted] = useState(false);


    useEffect(() => {
        let nameLoad =  manager.getCollection(id).then(data => setName(data.name));
        let cardsLoad = manager.getCardsForCollectionEdit(id).then(data => {
            setCards(data)
            let states = data.reduce((obj, item) => {
                return {
                    ...obj,
                    [item.id]: item.inCollection
                }
            }, {})
            setCardStates(states)
        })
        Promise.all([nameLoad, cardsLoad]).then(() => setIsLoading(false))
    }, [manager, id])

    const handleSubmit = () => {
        manager.updateCollection(id, name, cardStates)
        setCompleted(true);
    }

    if(completed){
        return <Redirect to="/manage/collections"/>
      }
  
    const onCheck = card_id => {
    setCardStates({
        ...cardStates,
        [card_id]: !cardStates[card_id]
    })
    }

    return (
        isLoading ? <Loader/> :
        <EditorWindow caption="Collection editor" onReturn={() => setCompleted(true)}>
            <form className={styles["content"]} onSubmit={handleSubmit}>
                <header>
                    <div className={styles["name-container"]} >
                        <InputField 
                            className={styles["name"]} value={name} onChange={setName}/>
                    </div>
                </header>
                <div className={styles["cards"]}>
                        {cards.map(c => <CardItem card={c} key={c.id} isChecked={cardStates[c.id]} onClick={() => onCheck(c.id)}/>)}
                </div>
                <SubmitButton label="Save" className={styles["save-btn"]} />
            </form>
        </EditorWindow>
    )
  
}

export default CollectionEdit