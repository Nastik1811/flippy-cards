import React, { useContext } from 'react'
import app from '../firebase'
import firebase from 'firebase'
import { AuthContext } from '../Auth'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

export const Landing = () => {

    const {currentUser} = useContext(AuthContext);
    if(!!currentUser){
        return <Redirect to="/home" />
    }
    return (
        <div className="landing">
            <section>
                Hello from landing!
                <img className="landing-img" src="assets/images/girl.png" alt=""/>
                <Link to="/signup" className="accent-btn"  >Get started! </Link>

            </section>
            <section>
                Description
                <Link className="accent-btn" >Get started!</Link>
            </section>
        </div>
    )
}
