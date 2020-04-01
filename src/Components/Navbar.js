import React, { useContext } from 'react';
import {NavLink, Link} from 'react-router-dom';
import app, {authUI, authConfig} from '../firebase';
import firebase from 'firebase'
import { AuthContext } from '../Auth';


const Navbar = () => {
    const {currentUser} = useContext(AuthContext);
    return (
        <header className="main-header">
            <div className="logo-container" >
                <Link to='/home'>Flippy</Link>
            </div>
            <nav className="main-navbar">
                <ul className="nav-links">
                    {!!currentUser ? (
                        <>
                            <li><NavLink activeClassName="active-link" to='/home' >Home</NavLink></li>
                            <li><NavLink activeClassName="active-link" to='/manage'>Manage</NavLink></li>
                            <li><Link to='/' className="sign-out" onClick={() => app.auth().signOut()}>Sign out</Link></li>
                        </>
                    ) : (
                        <>
                        <li><Link to='/login' className="sign-in">Log in</Link></li>
                        <li><Link to='/signup' className="sign-in">Sign up</Link></li>
                        </>
                        )
                    }
                </ul>
            </nav>
        </header>
    )

}
export default Navbar;