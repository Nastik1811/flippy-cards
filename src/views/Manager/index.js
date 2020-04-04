import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import CardPreview from './CardPreview'
import CollectionPreview from './CollectionPreview'
import { getCollections, getCards } from '../../DummyData'
import styles from './Manager.module.scss'

const Tabbar = ({children, activeTabIndex}) => {

    return (
        <nav className="tabbar">
            <ul className="tab-links">
                {children}
            </ul>
            <hr/>
        </nav>
    )
}

const Tab = ({active, index, label, onClick}) => {

    let className = active ? "tab-active" : "tab";
    return (
        <li className={className} onClick={()=>{onClick(index)}}>{label}</li>
    )
}

const CardsPanel = ({cards}) => {
    return (
            <div className="board-active">
                <CreateNewButton/>
                {cards.map(c => <CardPreview front={c.front} back={c.back} />)}
            </div>
    )
}

const CollectionsPanel = ({collections}) => {
    return (
            <div className="board-active">
                 <CreateNewButton/>
                {collections.map((c, i) => <CollectionPreview slug={i} name={c.name} created={c.created}/>)}
            </div>
    )
}

export const CreateNewButton = props => {
    return (
        <>
        <div className="preview-container">
            <div className="preview-component add-btn">+
            </div>
            <div className="preview-component outline-border"></div>
        </div>
        
        </>
    )
}

const Manager = () => {
    const [cards, setCards] = useState(null);
    const [collections, setCollections] = useState(null);
    const [currentTab, setCurrentTab] = useState(0);

    useEffect(()=>{
        const data = getCards();
        setCards(data)
    }, [])

    useEffect(()=>{
        const data = getCollections();
        setCollections(data)
    }, [])

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