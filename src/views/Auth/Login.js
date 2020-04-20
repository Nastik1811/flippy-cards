import React, {useCallback, useContext} from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import { AuthContext } from '../../Auth';
import {FirebaseContext} from '../../firebase';
import styles from './Auth.module.scss'

export const Login = ({history}) => {
    const {currentUser} = useContext(AuthContext);
    const {app} = useContext(FirebaseContext);

    const handleLogin = useCallback(
        async event => {
          event.preventDefault();
          const { email, password } = event.target.elements;
          try {
            await app.login(email.value, password.value);
            history.push("/home");
          } catch (error) {
            alert(error);
          }
        },
        [history, app]
      );

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
