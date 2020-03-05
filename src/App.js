import React from 'react'
import Home from './views/Home'
import Manage from './views/Manage'
import Error from './views/Error'
import Session from './views/Session'
import Navbar from './Components/Navbar'

import { Route, Link, Switch, Router } from 'react-router-dom'


const App = () => {
    return (
        <div className="app-container cloud-background">
            <Navbar/>
            <div className="main-container">
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/manage/' component={Manage}/> 
                    <Route exact path='/session'component={Session}/>
                    <Route component={Error}/> 
                </Switch>
            </div>
        </div>
    )
}

export default App;

