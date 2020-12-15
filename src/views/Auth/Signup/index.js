import React, {useState} from 'react'
import styles from '../Auth.module.scss'
import {SubmitButton, InputField } from '../../../components/FormElements'
import { useHttp } from '../../../hooks/http.hook'
import { useHistory } from 'react-router-dom'


const Signup = () => {
  const {request} = useHttp()
  const [data, setData] = useState({ email: "", password: "", username: "" })
  const history = useHistory()

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
        await request('/api/auth/signup', 'POST', {...data})
        alert("Your account has been succcesfully created! Now, let's log in :)")
        history.push('/auth/login')
      } catch (error) {
        alert(error);
      }
    }

    return (
      <form onSubmit={handleSignUp} className={styles["auth-form"]}>
        <InputField type="text" 
          placeholder="name" 
          value={data.username}
          onChange={username => (setData({...data, username}))}
          />
        <InputField
          type="email" 
          value={data.email}
          placeholder="email" 
          onChange={email => (setData({...data, email}))}
          />
        <InputField 
          type="password" 
          value={data.password}
          placeholder="password"  
          onChange={password => (setData({...data, password}))}
          />
        <SubmitButton label="Sign up" className={styles["submit-btn"]}/>
      </form>
    )
}

export default Signup;