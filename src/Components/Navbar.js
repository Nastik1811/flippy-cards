import React, { Component } from 'react';
import {Link} from 'react-router-dom';

const Navbar = ({isAutorized}) => {
        return (
            <header class="main-header">
                <div class="logo-container" >
                    <Link to='/home'>Flippy</Link>
                </div>
                <nav className="main-navbar">
                    <ul className="nav-links">
                        {isAutorized ? (
                            <>
                                <li><Link to='/home' >Home</Link></li>
                                <li><Link to='/manage'>Manage</Link></li>
                                <li><Link to='/home' className="sign-out">Sign out</Link></li>
                            </>
                        ) : (
                            <li><Link to='/home' className="sign-in">Sign in</Link></li>
                            )
                        }
                    </ul>
                </nav>
            </header>
        )
    
}
export default Navbar;