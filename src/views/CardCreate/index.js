import React, {useContext, useState, useEffect} from 'react'
import { DataContext } from '../../DataManger';
import {Redirect} from 'react-router-dom'
import CardForm from '../CardForm';
import Loader from '../../components/Loader';
import EditorWindow from '../../components/EditorWindow';

const CardCreate = () => {
    const {manager} = useContext(DataContext);
    const [completed, setCompleted] = useState(false);
    const [collections, setCollections] = useState(null);
  
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
  
    useEffect(() => {
        manager.getCollections().then(data => setCollections(data))
      }, [manager])

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

    return (collections ? 
      <EditorWindow caption="New card">
        <CardForm 
            initialDetails={initialDetails} 
            collections={collections}
            onSubmit={onSubmit}/>
      </EditorWindow> 
      : 
      <Loader/>)
  }

  export default CardCreate