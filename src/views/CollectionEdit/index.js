import React, { useState, useContext, useEffect, useCallback } from 'react'
import CardItem from './CardItem'
import { useParams, withRouter, Redirect } from 'react-router-dom'
import styles from './CollectionEditor.module.scss'
import { DataContext } from '../../DataManger'
import EditorWindow from '../../components/EditorWindow'
import Loader from '../../components/Loader'
import {SubmitButton, InputField} from '../../components/FormElements'


const CollectionEdit = ({history}) => {
    let {slug} = useParams();
    const {manager} = useContext(DataContext);

    const [name, setName] = useState("");
    const [cards, setCards] = useState([]);
    const [cardStates, setCardStates] = useState({})
    //const [uncheckedCards, setUncheckedCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [completed, setCompleted] = useState(false);


    useEffect(() => {
        let nameLoad =  manager.getCollection(slug).then(data => setName(data.name));
        let cardsLoad = manager.getCardsForCollectionEdit(slug).then(data => {
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
    }, [manager, slug])

    const handleSubmit = () => {
        manager.updateCollection(slug, name, cardStates)
        console.log(cardStates)
        setCompleted(true);
    }

    if(completed){
        return <Redirect to="/manage/collections"/>
      }
  
      const onCheck = id => {
        setCardStates({
            ...cardStates,
            [id]: !cardStates[id]
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
//update collection name
//update all cards

export default withRouter(CollectionEdit) 