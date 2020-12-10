import React, {useContext, useState} from 'react'
import styles from '../Auth.module.scss'
import {SubmitButton, InputField, } from '../../../components/FormElements'
import { AuthContext } from '../../../context/AuthContext'

const Login = () => {
    const {request} = useHttp()
    const {login} = useContext(AuthContext)
    const [data, setData] = useState({ email: "", password: "" });

    const handleLogin = async (event) => {
      event.preventDefault();
      try {
        const res = await request('/api/auth/login', 'POST', {...data})
        login(res.token, res.userId);
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
