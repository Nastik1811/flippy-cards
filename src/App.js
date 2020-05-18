import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Landing from './views/Landing';
import Manager from './views/Manager';
import OverviewContainer from './views/Overview';
import Home from './views/Home';
import Auth from './views/Auth';
import CardCreate from './views/CardCreate';
import CardEdit from './views/CardEdit';
import CollectionEditor from './views/CollectionEdit';
import NotFound from './views/NotFound';



const App = () => {
    return (
        <div className="app-container cloud-background">
            <Navbar/>
            <div className="main-container">
                <Switch>
                    <Route exact path='/' component={Landing}/>
                    <Route path='/auth' component={Auth}/>
                    <PrivateRoute path='/home' component={Home}/>
                    <PrivateRoute path ='/manage' component={Manager}/> 
                    <PrivateRoute exact path='/session' component={OverviewContainer}/>
                    <PrivateRoute exact path='/session/:slug' component={OverviewContainer}/>
                    <PrivateRoute path='/card/new' component={CardCreate}/>
                    <PrivateRoute path='/card/:id' component={CardEdit}/>
                    <PrivateRoute path='/collection/:id' component={CollectionEditor}/>
                    <Route path="*" component={NotFound}/> 
                </Switch>
            </div>
        </div>
    )
}

export default App;

