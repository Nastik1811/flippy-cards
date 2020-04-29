import React from 'react'
import CollectionsPanel from './CollectionsPanel';
import CardsPanel from './CardsPanel';

import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import Tabbar, { Tab } from './Tabbar';

const Manager = () => {
    return (
        <section>
            <Tabbar>
                <Tab url="/manage/collections" label="Collections"/>
                <Tab url="/manage/cards" label="Cards"/>
            </Tabbar>
            <Switch>
                <Route path="/manage/collections" children={<CollectionsPanel/>}/>
                <Route path="/manage/cards" children={<CardsPanel/>} />   
                <Redirect to="/manage/collections"/>
            </Switch>
        </section>
    )
}

export default Manager;