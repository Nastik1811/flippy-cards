import React, {useContext} from 'react'
import { DataContext } from '../../DataManger';
import CardForm from '../../components/CardForm';

const CardCreateContainer= ({history}) => {
    const {manager} = useContext(DataContext);
  
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
        history.push('/home');
      } catch (error) {
        alert(error);
      }
    }
  
    return <CardForm 
            initialDetails={initialDetails} 
            onSubmit={newDetails => onSubmit(newDetails)}/>  
  
  }

  export default CardCreateContainer