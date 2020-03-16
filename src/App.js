import React from 'react'
import Home from './views/Home'
import Manage from './views/Manage'
import Error from './views/Error'
import Session from './views/Session'
import Navbar from './Components/Navbar'

import { Route, Switch } from 'react-router-dom'
import CardEditor from './views/CardEditor'
import { Landing } from './views/Landing'
import CollectionEditor from './views/CollectionEditor'
import firebase from './firebase'
import PrivateRoute from './PrivateRoute'
import { Login } from './Components/Login'
import Signup from './Components/Signup'



const App = () => {
    return (
        <div className="app-container cloud-background">
            <Navbar/>
            <div className="main-container">
                <Switch>
                    <Route exact path='/' component={Landing}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/signup' component={Signup}/>
                    <PrivateRoute exact path='/home' component={Home}/>
                    <PrivateRoute exact path='/manage/' component={Manage}/> 
                    <PrivateRoute exact path='/session' component={Session}/>
                    <PrivateRoute exact path='/session/:slug' component={Session}/>
                    <PrivateRoute exact path='/editor/:slug' component={CardEditor}/>
                    <PrivateRoute exact path='/collection/:slug' component={CollectionEditor}/>
                    <Route component={Error}/> 
                </Switch>
            </div>
        </div>
    )
}

export default App;

