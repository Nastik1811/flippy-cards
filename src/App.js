import React from 'react'
import Home from './views/Home'
import Manage from './views/Manage'
import Error from './views/Error'
import Session from './views/Session'
import Navbar from './Components/Navbar'

import { Route, Link, Switch, Router } from 'react-router-dom'
import CardEditor from './views/CardEditor'
import { Landing } from './views/Landing'

let isAutorized = true;

const App = () => {
    return (
        <div className="app-container cloud-background">
            <Navbar isAutorized={isAutorized}/>
            <div className="main-container">
                <Switch>
                    <Route exact path='/' component={Landing}/>
                    <Route exact path='/home' component={Home}/>
                    <Route exact path='/manage/' component={Manage}/> 
                    <Route exact path='/session' component={Session}/>
                    <Route exact path='/session/:slug' component={Session}/>
                    <Route exact path='/editor/:slug' component={CardEditor}/>
                    <Route component={Error}/> 
                </Switch>
            </div>
        </div>
    )
}

export default App;

