import React, {useContext, useState} from 'react'
import { DataContext } from '../../DataManger';
import {Redirect} from 'react-router-dom'
import CardForm from '../../components/CardForm';

const CardCreate= ({history}) => {
    const {manager} = useContext(DataContext);
    const [completed, setCompleted] = useState(false)
  
    const initialDetails = {
        content: {
          front: "", 
          back: ""
        },
        collection: {
          id: null,
          name: ""
        }
      }
  
    const onSubmit = async (newDetails) => {
      try {
        await manager.addCard(newDetails);
        setCompleted(true)
      } catch (error) {
        alert(error);
      }
    }
  
    if(completed){
      return <Redirect to="/manage/cards"/>
    }

    return <CardForm 
            initialDetails={initialDetails} 
            onSubmit={newDetails => onSubmit(newDetails)}/>  
  }

  export default CardCreate