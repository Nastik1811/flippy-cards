import React, { useState, useEffect, useContext } from 'react'
import CardPreview from './CardPreview'
import { Link } from 'react-router-dom'
import CollectionPreview from './CollectionPreview'
import styles from './Manager.module.scss'
import { DataContext } from '../../DataManger'

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
        cards ?
            <div className={styles["board"]}>
                <Link to="/new" className={styles["add-btn"]}> + </Link>
                {cards.map(c => <CardPreview slug={c.id} front={c.content.front} back={c.content.back} key={c.id} />)}
            </div> 
            : 
            <div>Loading...</div>
    )
}

const CollectionsPanel = ({collections, match}) => {
    return (
        collections ?
            <div className={styles["board"]}>
                <Link to={match.url + "/new"}  className={styles["add-btn"]}> + </Link>
                {collections.map(c => <CollectionPreview slug={c.id} name={c.name} key={c.id}/>)}
            </div>
            : 
            <div>Loading...</div>
    )
}

//I'm still thinking about suggested approach to manage collections and cards separately via corresponding urls
//But for now I'd like to solve other problems first

const Manager = ({match}) => {
    const {manager} = useContext(DataContext);

    const [collections, setCollections] = useState([]);
    useEffect(() => {
        manager.getCollections().then(data => setCollections(data))
    }, [manager]
    )

    const [cards, setCards] = useState([]);
    useEffect(() => {
        manager.getCards().then(data => setCards(data))
    }, [manager]
    )

    const [currentTab, setCurrentTab] = useState(0);

    return (
        <>
            <Tabbar>
                <Tab index="0" active={currentTab === 0 ? true : false}  label="Collections" onClick={index => setCurrentTab(index)}/>
                <Tab index="1" active={currentTab === 1 ? true : false}  label="Cards" onClick={index => setCurrentTab(index)} />
            </Tabbar>
            {currentTab === 0 ? <CollectionsPanel collections={collections} match={match}/> : <CardsPanel cards={cards} />}
        </>
    )
}


export default Manager;