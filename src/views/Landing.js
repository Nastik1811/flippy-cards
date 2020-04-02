import React, { useContext } from 'react'
import app from '../firebase'
import firebase from 'firebase'
import { AuthContext } from '../Auth'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import girl from '../assets/images/girl.png'

export const Landing = () => {

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
