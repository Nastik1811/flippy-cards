import React, {useCallback, useContext} from 'react'
import app from '../firebase';
import { AuthContext } from '../Auth';
import {withRouter, Redirect} from 'react-router-dom';


const Signup = ({history}) => {

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
          await app
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value);
          history.push("/home");
        } catch (error) {
          alert(error);
        }
      }, [history]);



    const {currentUser} = useContext(AuthContext);
    if(!!currentUser){
        return <Redirect to="/home" />
    }

    return (
      <div className="auth-container">
        <h2 className="form-header">Sign up</h2>
        <form onSubmit={handleSignUp} className="auth-form">
                <input type="text" name="userName" placeholder="name"/>
                <input type="email" name="email" placeholder="email"/>
                <input type="password" name="password" placeholder="password"/>
                <button type="submit" className="submit-btn">Sign up</button>
        </form>
            
      </div>
    )
}

export default withRouter(Signup);