import React, { useContext } from 'react';
import {NavLink, Link} from 'react-router-dom';
import app, {authUI, authConfig} from '../firebase';
import { AuthContext } from '../Auth';


const Navbar = () => {
    const {currentUser} = useContext(AuthContext);
    return (
        <header className="main-header">
            <div className="logo-container" >
                <Link to='/home'>Flippy</Link>
            </div>
            <nav className="main-navbar">
                    {!!currentUser ? (
                        <>
                            <NavLink className="nav-link" activeClassName="active-link" to='/home' >Home</NavLink>
                            <NavLink className="nav-link" activeClassName="active-link" to='/manage'>Manage</NavLink>
                            <Link to='/' className="sign-out" onClick={() => app.auth().signOut()}>Sign out</Link>
                        </>
                    ) : (
                        <>
                        <Link to='/login' className="sign-out" >Log in</Link>
                        <Link to='/signup' className="sign-out" >Sign up</Link>
                        </>
                        )
                    }
            </nav>
        </header>
    )

}
export default Navbar;