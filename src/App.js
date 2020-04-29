import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Landing from './views/Landing';
import Manager from './views/Manager';
import Overview from './views/Overview';
import Home from './views/Home';
import Auth from './views/Auth';
import CardCreate from './views/CardCreate';
import CardEdit from './views/CardEdit';
import CollectionEditor from './views/CollectionEdit';



const App = () => {
    return (
        <div className="app-container cloud-background">
            <Navbar/>
            <div className="main-container">
                <Switch>
                    <Route exact path='/' component={Landing}/>
                    <Route path='/auth' component={Auth}/>
                    <PrivateRoute exact path='/home' component={Home}/>
                    <PrivateRoute path ='/manage' component={Manager}/> 
                    <PrivateRoute exact path='/session' component={Overview}/>
                    <PrivateRoute exact path='/session/:slug' component={Overview}/>
                    <PrivateRoute path='/card/new' component={CardCreate}/>
                    <PrivateRoute path='/card/:id' component={CardEdit}/>
                    <PrivateRoute exact path='/collection/new' component={CollectionEditor}/>
                    <PrivateRoute exact path='/collection/:slug' component={CollectionEditor}/>
                    <Route component={Error}/> 
                </Switch>
            </div>
        </div>
    )
}

export default App;

