import React, {useCallback, useContext} from 'react'
import app from '../../firebase';
import {withRouter, Redirect} from 'react-router-dom'
import { AuthContext } from '../../Auth';
import styles from './Auth.module.scss'

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
    <div className={styles["auth-container"]}>
      <h2 className={styles["form-header"]}>Login</h2>
      <form onSubmit={handleLogin} className={styles["auth-form"]}>
          <input type="email" name="email" placeholder="email"/>
          <input type="password" name="password" placeholder="password"/>
          
          <button type="submit" className={styles["submit-btn"]}>Login</button>
      </form>
        
    </div>
    )
}

export default withRouter(Login)
