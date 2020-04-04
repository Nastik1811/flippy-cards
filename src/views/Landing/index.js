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
        <div className="landing">
            <section className="landing-section medium"> 
                <Link to="/signup" className="accent-btn"  >Get started! </Link>
            </section>
        </div>
    )
}

export default Landing