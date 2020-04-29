import React, { useContext, useState} from 'react'
import {FirebaseContext} from '../../../firebase';
import styles from '../Auth.module.scss'
import {SubmitButton, InputField, } from '../../../components/FormElements'


const Signup = () => {
  const {app} = useContext(FirebaseContext);
  const [data, setData] = useState({ email: "", password: "", name: "" })

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
        await app.createUser(data);
      } catch (error) {
        alert(error);
        setData({ email: "", password: "", name: ""})
      }
    }

    return (
      <form onSubmit={handleSignUp} className={styles["auth-form"]}>
        <InputField type="text" 
          placeholder="name" 
          value={data.name}
          onChange={name => (setData({...data, name}))}
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