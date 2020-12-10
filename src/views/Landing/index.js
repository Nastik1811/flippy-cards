import React from 'react'
import { Redirect } from 'react-router-dom'
import styles from './Landing.module.scss'
import LinkButton from '../../components/LinkButton'
import { useAuth } from '../../hooks/auth.hook'

const Landing = () => {
    const {token} = useAuth()
    if(!!token){
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