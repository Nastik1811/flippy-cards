import React, { useState, useEffect, useContext } from 'react'
import CardPreview from './CardPreview'
import CollectionPreview from './CollectionPreview'
import styles from './Manager.module.scss'
import { DataContext } from '../../DataManger'


import {
    Switch,
    Route,
    NavLink,
    useRouteMatch,
    Link,
    Redirect
  } from "react-router-dom";

import CollectionCreate from '../CollectionCreate'

const CardsPanel = () => {
    const {manager} = useContext(DataContext);
    let match = useRouteMatch();
    const [cards, setCards] = useState(null);

    useEffect(() => {
        manager.getCards().then(data => setCards(data))
    }, [manager]
    )

    return cards ?
            (<div className={styles["board"]}>
                <Link to={match.url + "/new"} className={styles["add-btn"]}> + </Link>
                {cards.map(c => <CardPreview card={c} key={c.id} />)}
                <Route path={match.path + "/new"} children={<CollectionCreate/>} />
            </div> )
            : 
            (<div>Loading...</div>)
}

const CollectionsPanel = () => {
    const {manager} = useContext(DataContext);
    let match = useRouteMatch();
    const [collections, setCollections] = useState(null);

    useEffect(() => {
        manager.getCollections().then(data => setCollections(data))
    }, [manager])

    return collections ?
            (<div className={styles["board"]}>
                <Link to={match.url + "/new"}  className={styles["add-btn"]}> + </Link>
                    {collections.map(c => <CollectionPreview collection={c} key={c.id}/>)}
                <Route path={match.path + "/new"} children={<CollectionCreate/>} />
            </div>)
            : 
            (<div>Loading...</div>)
}

const Manager = ({match}) => {
    //let match = useRouteMatch();
    
    return (
        <section>
            <nav className={styles["tabbar"]}>
                <NavLink to={match.url + "/collections"} className={styles["tab"]} activeClassName={styles["tab-active"]} >Collections</NavLink>
                <NavLink to={match.url + "/cards"}  className={styles["tab"]} activeClassName={styles["tab-active"]}>Cards</NavLink>
            </nav>
            <Switch>
                <Route path={match.path + "/collections"} children={<CollectionsPanel/>}/>
                <Route path={match.path + "/cards"} children={<CardsPanel/>} />   
                <Redirect to={match.path + "/collections"}/>
            </Switch>
        </section>
    )
}

export default Manager;