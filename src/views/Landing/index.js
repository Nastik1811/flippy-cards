import React, { useContext } from 'react'
import { AuthContext } from '../../Auth'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import styles from './Landing.module.scss'

const Landing = () => {

    const {currentUser} = useContext(AuthContext);
    if(!!currentUser){
        return <Redirect to="/home" />
    }
    return (
        <div className={styles["landing"]}>
            <section className={styles["landing-section"]}> 
                <Link to="/auth" className={styles["start-btn"]}>Get started! </Link>
            </section>
        </div>
    )
}

export default Landing