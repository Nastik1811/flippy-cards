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
        <div>
            <form onSubmit={handleSignUp}>
                <label >
                    Email
                    <input type="email" name="email" placeholder="email"/>
                </label>
                <label>
                    Password
                    <input type="password" name="password" placeholder="password"/>
                </label>
                <button type="submit">Sign up</button>
            </form>
            
        </div>
    )
}

export default withRouter(Signup);