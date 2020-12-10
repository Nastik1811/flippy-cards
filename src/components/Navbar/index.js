import React, { useContext } from 'react';
import {NavLink, Link} from 'react-router-dom';
import styles from './Navbar.module.scss'
import { useAuth } from '../../hooks/auth.hook';


const Navbar = () => {
    const {logout, token} = useAuth()
    
    return (
        <header className={styles["header"]}>
            <div className={styles["logo-container"]} >
                <NavLink to='/home'>Flippy</NavLink>
            </div>
            <nav className={styles["navbar"]}>
                    {!!token ? (
                        <>
                            <NavLink className={styles["nav-link"]} activeClassName={styles["active-link"]} to='/home' >Home</NavLink>
                            <NavLink className={styles["nav-link" ]} activeClassName={styles["active-link"]} to='/manage'>Manage</NavLink>
                            <Link to='/' className={styles["auth-link"]} onClick={logout}>Sign out</Link>
                        </>
                    ) : (
                        <>
                            <NavLink to='/auth/login' className={styles["auth-link"]} >Log in</NavLink>
                            <NavLink to='/auth/signup' className={styles["auth-link"]} >Sign up</NavLink>
                        </>
                        )
                    }
            </nav>
        </header>
    )

}
export default Navbar;