import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import CardPreview from './CardPreview'
import CollectionPreview from './CollectionPreview'
import { getCollections, getCards } from '../../DummyData'
import styles from './Manager.module.scss'

const Tabbar = ({children}) => {

    return (
        <nav className={styles["tabbar"]}>
            <ul className={styles["tab-links"]}>
                {children}
            </ul>
            <hr/>
        </nav>
    )
}

const Tab = ({active, index, label, onClick}) => {

    let className = active ? styles["tab-active"] : styles["tab"];
    return (
        <li className={className} onClick={()=>{onClick(+index)}}>{label}</li>
    )
}

const CardsPanel = ({cards}) => {
    return (
            <div className={styles["board"]}>
                <CreateNewButton/>
                {cards.map(c => <CardPreview front={c.front} back={c.back} />)}
            </div>
    )
}

const CollectionsPanel = ({collections}) => {
    return (
            <div className={styles["board"]}>
                <CreateNewButton/>
                {collections.map((c, i) => <CollectionPreview slug={i} name={c.name} created={c.created}/>)}
            </div>
    )
}

const CreateNewButton = props => {
    return (
            <div className={styles["add-btn"]}>+
            </div>
    )
}

const Manager = () => {
    let collections = getCollections();
    let cards = getCards();

    //const [cards, setCards] = useState(getCards());
    //const [collections, setCollections] = useState(getCollections());
    const [currentTab, setCurrentTab] = useState(0);

    // useEffect(()=>{
    //     const data = getCards();
    //     setCards(data)
    // })

    // useEffect(()=>{
    //     const data = getCollections();
    //     setCollections(data)
    // })

    return (
        <>
            <Tabbar>
                <Tab index="0" active={currentTab === 0 ? true : false}  label="Collections" onClick={index => setCurrentTab(index)}/>
                <Tab index="1" active={currentTab === 1 ? true : false}  label="Cards" onClick={index => setCurrentTab(index)} />
            </Tabbar>
            {currentTab === 0 ? <CollectionsPanel collections={collections}/> : <CardsPanel cards={cards} />}
        </>
    )
}


export default Manager;