import React, {useContext, useState, useEffect} from 'react'
import {useParams, Redirect} from 'react-router-dom'
import { DataContext } from '../../DataManger';
import CardForm from '../CardForm';
import Loader from '../../components/Loader';
import EditorWindow from '../../components/EditorWindow';

const CardEdit = () => {
    const {manager} = useContext(DataContext);
    const {id} = useParams();

    const [initialDetails, setInitialDetails] = useState(null);
    const [collections, setCollections] = useState(null);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
      manager.getCollections().then(data => setCollections(data))
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
      initialDetails && collections ? 
      <EditorWindow caption="Card editor">
        <CardForm 
              initialDetails={initialDetails} 
              collections={collections}
              onSubmit={onSubmit}/>
      </EditorWindow>
      : 
      <Loader/>
    )
  
  }

  export default CardEdit