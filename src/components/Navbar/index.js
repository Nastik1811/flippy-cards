import React, { useContext } from 'react';
import {NavLink, Link} from 'react-router-dom';
import {FirebaseContext} from '../../firebase';
import { AuthContext } from '../../Auth';
import styles from './Navbar.module.scss'


const Navbar = () => {
    const {currentUser} = useContext(AuthContext);
    const {app} = useContext(FirebaseContext);
    
    return (
        <header className={styles["header"]}>
            <div className={styles["logo-container"]} >
                <Link to='/home'>Flippy</Link>
            </div>
            <nav className={styles["navbar"]}>
                    {!!currentUser ? (
                        <>
                            <NavLink className={styles["nav-link"]} activeClassName={styles["active-link"]} to='/home' >Home</NavLink>
                            <NavLink className={styles["nav-link" ]} activeClassName={styles["active-link"]} to='/manage'>Manage</NavLink>
                            <Link to='/' className={styles["auth-link"]} onClick={() => app.signOut()}>Sign out</Link>
                        </>
                    ) : (
                        <>
                            <Link to='/login' className={styles["auth-link"]} >Log in</Link>
                            <Link to='/signup' className={styles["auth-link"]} >Sign up</Link>
                        </>
                        )
                    }
            </nav>
        </header>
    )

}
export default Navbar;