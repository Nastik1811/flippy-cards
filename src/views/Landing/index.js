import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import styles from './Landing.module.scss'
import LinkButton from '../../components/LinkButton'
import { AuthContext } from '../../context/AuthContext'

const Landing = () => {
    const {token} = useContext(AuthContext)
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