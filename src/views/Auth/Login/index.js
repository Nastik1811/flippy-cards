import React, {useCallback, useContext} from 'react'
import {withRouter} from 'react-router-dom'
import {FirebaseContext} from '../../../firebase';
import styles from '../Auth.module.scss'

const Login = ({history}) => {
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

    return (
      <form onSubmit={handleLogin} className={styles["auth-form"]}>
          <input type="email" name="email" placeholder="email"/>
          <input type="password" name="password" placeholder="password"/>
          
          <button type="submit" className={styles["submit-btn"]}>Login</button>
      </form>
    )
}

export default withRouter(Login)
