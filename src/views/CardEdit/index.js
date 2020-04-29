import React, {useContext, useState, useEffect} from 'react'
import {useParams, Redirect} from 'react-router-dom'
import { DataContext } from '../../DataManger';
import CardForm from '../../components/CardForm';

const CardEdit = () => {
    const {manager} = useContext(DataContext);
    const {id} = useParams();

    const [initialDetails, setInitialDetails] = useState(null);
    const [completed, setCompleted] = useState(false)

    useEffect(() => {
      manager.getCardDetails(id).then(data => setInitialDetails(
            {
              content: data.content, 
              collection: data.collection
            })
          )
    }, [manager, id])
  
    const onSubmit = async (newDetails) => {
      try {
        await manager.updateCard(id, newDetails)
        setCompleted(true);
      } catch (error) {
        alert(error);
      }
    }
  
    if(completed){
      return <Redirect to="/manage/cards"/>
    }

    return (
      initialDetails ? 
        (<CardForm 
              initialDetails={initialDetails} 
              onSubmit={onSubmit}/>
              ) : 
        <div>Loading...</div>
    )
  
  }

  export default CardEdit