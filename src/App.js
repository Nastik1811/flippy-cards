import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Landing from './views/Landing';
import Manager from './views/Manager';
import Overview from './views/Overview';
import CardEditor from './views/CardEditor';
import CollectionEditor from './views/CollectionEditor';
import Home from './views/Home';
import { Login, Signup } from './views/Auth';
import NewCollectionForm from './views/NewCollectionForm';



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
                    <PrivateRoute exact path='/manage/' component={Manager}/> 
                    <PrivateRoute path='/manage/new' component={NewCollectionForm}/> 
                    <PrivateRoute exact path='/session' component={Overview}/>
                    <PrivateRoute exact path='/session/:slug' component={Overview}/>
                    <PrivateRoute exact path='/new' component={CardEditor}/>
                    <PrivateRoute exact path='/collection/:slug' component={CollectionEditor}/>
                    <Route component={Error}/> 
                </Switch>
            </div>
        </div>
    )
}

export default App;

