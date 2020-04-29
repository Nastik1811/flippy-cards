import React, { useContext } from 'react'
import { AuthContext } from '../../Auth'
import { Redirect } from 'react-router-dom'
import styles from './Landing.module.scss'
import LinkButton from '../../components/LinkButton'

const Landing = () => {

    const {currentUser} = useContext(AuthContext);
    if(!!currentUser){
        return <Redirect to="/home" />
    }
    return (
        <div className={styles["landing"]}>
            <section className={styles["landing-section"]}> 
                <LinkButton url="/auth" className={styles["start-btn"]} label="Get started!"/>
            </section>
        </div>
    )
}

export default Landing