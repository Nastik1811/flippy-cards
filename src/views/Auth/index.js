import React, {useContext, useMemo} from 'react'
import { AuthContext } from '../../Auth';
import {Redirect, NavLink, Route, Switch} from 'react-router-dom'
import styles from './Auth.module.scss'
import Login from './Login';
import Signup from './Signup';

const Auth = () => {
    const {currentUser} = useContext(AuthContext);
    
    useMemo(() => {
        if(!!currentUser){
            return <Redirect to="/home" />
        }
    }, [currentUser])

    return (
        <div className={styles["auth-container"]}>
            <nav className={styles["form-header"]}>
                <NavLink to={"/auth/login"} className={styles["form-header"]} activeClassName={styles["tab-active"]} >Login</NavLink>
                <NavLink to={"/auth/signup"}  className={styles["form-header"]} activeClassName={styles["tab-active"]}>Signup</NavLink>
            </nav>
            <Switch>
                <Route path={"/auth/login"} children={<Login/>}/>
                <Route path={"/auth/signup"} children={<Signup/>} />
            </Switch>        
        </div>
    )
}
export default Auth