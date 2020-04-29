import React, {useContext, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { DataContext } from '../../DataManger';
import CardForm from '../../components/CardForm';


const CardEditContainer = ({history}) => {
    const {manager} = useContext(DataContext);
    const {id} = useParams();
    const [initialDetails, setInitialDetails] = useState(null);
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
        history.push('/home')
      } catch (error) {
        alert(error);
      }
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

  export default CardEditContainer