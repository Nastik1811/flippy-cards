import React, { useContext } from 'react'
import {Redirect, NavLink, Route, Switch} from 'react-router-dom'
import styles from './Auth.module.scss'
import Login from './Login';
import Signup from './Signup';
import { AuthContext } from '../../context/AuthContext';

const Auth = ({match}) => {
    const {token} = useContext(AuthContext);

    if(!!token){
        return <Redirect to="/home" />
    }

    return (
        <div className={styles["auth-container"]}>
            <nav className={styles["auth-tabs"]}>
                <NavLink to={match.url + "/login"} className={styles["tab"]} activeClassName={styles["tab-active"]} >Login</NavLink>
                <NavLink to={match.url + "/signup"}  className={styles["tab"]} activeClassName={styles["tab-active"]}>Signup</NavLink>
                <hr className={styles["hr"]}/>
            </nav>
            <Switch>
                <Route path={match.path + "/login"} children={<Login/>}/>
                <Route path={match.path + "/signup"} children={<Signup/>} />
                <Redirect to={match.path + "/login"}/>
            </Switch>        
        </div>
    )
}
export default Auth