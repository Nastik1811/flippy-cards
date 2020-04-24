import React, {useCallback, useContext} from 'react'
import {FirebaseContext} from '../../../firebase';
import {withRouter} from 'react-router-dom';
import styles from '../Auth.module.scss'


const Signup = ({history}) => {
  const {app} = useContext(FirebaseContext);

  const handleSignUp = useCallback(async event => {
      event.preventDefault();
      const { email, password,userName } = event.target.elements;
      try {
        await app.createUser(email.value, password.value, userName.value);
        history.push("/home");
      } catch (error) {
        alert(error);
      }
    }, [history, app]);

    return (
        <form onSubmit={handleSignUp} className={styles["auth-form"]}>
                <input type="text" name="userName" placeholder="name"/>
                <input type="email" name="email" placeholder="email"/>
                <input type="password" name="password" placeholder="password"/>
                <button type="submit" className={styles["submit-btn"]}>Sign up</button>
        </form>
    )
}

export default withRouter(Signup);