import React from 'react'
import CollectionsPanel from './CollectionsPanel';
import CardsPanel from './CardsPanel';
import styles from './Manager.module.scss'

import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import Tabbar, { Tab } from './Tabbar';

const Manager = () => {
    return (
        <section className={styles["manager"]}>
            <Tabbar>
                <Tab url="/manage/collections" label="Collections"/>
                <Tab url="/manage/cards" label="Cards"/>
            </Tabbar>
            <div className={styles["board"]}>
                <Switch>
                    <Route path="/manage/collections" children={<CollectionsPanel/>}/>
                    <Route path="/manage/cards" children={<CardsPanel/>} />   
                    <Redirect to="/manage/collections"/>
                </Switch>
            </div>
        </section>
    )
}

export default Manager;