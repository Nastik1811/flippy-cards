import React, {useContext, useState} from 'react'
import {FirebaseContext} from '../../../firebase';
import styles from '../Auth.module.scss'
import {SubmitButton, InputField, } from '../../../components/FormElements'

const Login = () => {
    const {app} = useContext(FirebaseContext);
    const [data, setData] = useState({ email: "", password: "" });

    const handleLogin = async (event) => {
      event.preventDefault();
      try {
        await app.login(data);
      } catch (error) {
        alert(error);
        setData({ email: "", password: "" })
      }
    }

    return (
      <form onSubmit={handleLogin} className={styles["auth-form"]}>
          <InputField
            type="email" 
            placeholder="email" 
            value={data.email}
            onChange={email => (setData({...data, email}))}
            />
          <InputField 
            type="password" 
            value={data.password}
            placeholder="password"  
            onChange={password => (setData({...data, password}))}
            />
          <SubmitButton label="Login" className={styles["submit-btn"]} />
      </form>
    )
}



export default Login
