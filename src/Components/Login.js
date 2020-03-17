import React, {useCallback, useContext} from 'react'
import app from '../firebase';
import {withRouter, Redirect} from 'react-router-dom'
import { AuthContext } from '../Auth';

export const Login = ({history}) => {
    const handleLogin = useCallback(
        async event => {
          event.preventDefault();
          const { email, password } = event.target.elements;
          try {
            await app
              .auth()
              .signInWithEmailAndPassword(email.value, password.value);
            history.push("/home");
          } catch (error) {
            alert(error);
          }
        },
        [history]
      );

    const {currentUser} = useContext(AuthContext);
    if(!!currentUser){
        return <Redirect to="/home" />
    }
    return (
        <div>
        <form onSubmit={handleLogin}>
            <label >
                Email
                <input type="email" name="email" placeholder="email"/>
            </label>
            <label>
                Password
                <input type="password" name="password" placeholder="password"/>
            </label>
            <button type="submit">Login</button>
        </form>
        
    </div>
    )
}

export default withRouter(Login)
