import React, { Component } from 'react';
import {Link} from 'react-router-dom';


export default class Navbar extends Component {
    render() {
        return (
            <header class="main-header">
                <div class="logo-container" >
                    <Link to='/'>Flippy</Link>
                </div>
                <nav className="main-navbar">
                    <ul className="nav-links">
                        <li><Link to='/' >Home</Link></li>
                        <li><Link to='/manage'>Manage</Link></li>
                        <li><Link to='/' className="sign-out">Sign out</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
}
