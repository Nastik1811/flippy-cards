import React, { useState, useContext, useEffect } from 'react'
import CardItem from './CardItem'
import { useParams, useHistory, withRouter } from 'react-router-dom'
import styles from './CollectionEditor.module.scss'
import { DataContext } from '../../DataManger'
import EditorWindow from '../../components/EditorWindow'
import Loader from '../../components/Loader'
import {SubmitButton} from '../../components/FormElements'

const CheckablePreview = ({children}) => {
    return(<div>
        {children}
    </div>)
} 

const CollectionEdit = ({history}) => {
    let {slug} = useParams();
    const {manager} = useContext(DataContext);

    const [name, setName] = useState("");
    const [checkedCards, setCheckedCards] = useState([]);
    const [uncheckedCards, setUncheckedCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let nameLoad = manager.getCards(slug).then(setCheckedCards);
        let cardsLoad = manager.getCardsWithoutCollection().then(setUncheckedCards);
        let otherCardsLoad = manager.getCollection(slug).then(data => setName(data.name));
        Promise.all([nameLoad, cardsLoad, otherCardsLoad]).then(() => setIsLoading(false))
    }, [manager, slug])

    const handleSubmit = () => {
        manager.updateCollection(slug, name);
        history.push("/manage/collections");
    }

    return (
        isLoading ? <Loader/> :
        <EditorWindow caption="Collection editor">
            <form className={styles["content"]} onSubmit={handleSubmit}>
                <header>
                    <div className={styles["name_container"]} >
                        <input className={styles["name"]} value={name} onChange={e => setName(e.target.value)}/>
                    </div>
                </header>
                <div className={styles["cards"]}>
                        {uncheckedCards.map(c => <CardItem content={c.content} key={c.id}/>)}
                        {checkedCards.map(c => <CardItem content={c.content} key={c.id}/>)}
                </div>
                <SubmitButton label="Save" className={styles["save-btn"]} />
            </form>
        </EditorWindow>
    )
  
}
//update collection name
//update all cards

export default withRouter(CollectionEdit) 