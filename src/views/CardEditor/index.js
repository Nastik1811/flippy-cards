import React, {useCallback, useContext, useState, useEffect, useMemo} from 'react'
import {withRouter, useParams} from 'react-router-dom'
import styles from './CardEditor.module.scss'
import { DataContext } from '../../DataManger';
import SubmitButton from '../../components/SubmitButton';

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

  return (
    <div className={styles["editor"]}>
        <CardForm 
          initialDetails={initialDetails} 
          onSubmit={newDetails => onSubmit(newDetails)}/>  
    </div>
  )
}

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
      (<div className={styles["editor"]}>
          <CardForm 
            initialDetails={initialDetails} 
            onSubmit={newDetails => onSubmit(newDetails)}/>  
      </div>) : 
      <div>Loading...</div>
  )

}

const CardForm = ({initialDetails, onSubmit}) => {
  const {manager} = useContext(DataContext);

  const [collections, setCollections] = useState([]);
  const [cardDetails, setCardDetails] = useState(initialDetails);
  const handleSubmit = () => {
    //validate data here?
    onSubmit(cardDetails)
  }

  useEffect(() => {
    manager.getCollections().then(data => setCollections(data))
  }, [manager])

  return(
    <form onSubmit={handleSubmit} className={styles["card-editor-form"]}>
            <div className={styles["row-flex-container"]}>
                <ContentArea label="front" onChange={(front) => setCardDetails({...cardDetails, front})}/>
                <ContentArea label="back" onChange={(back) => setCardDetails({...cardDetails, back})}/>
            </div>

            <CollectionSet 
              collections={collections}
              value={cardDetails.collection} 
              onChange={collection => setCardDetails({...cardDetails, collection}) }
            />

            <SubmitButton label="Save" className={styles["submit-btn"]} />
        </form>
  )
}

//const CardFront = () => {}
//const CardBack = () => {}

const ContentArea = ({label, value, onChange}) => {
  return(
    <div className={styles["edit-container"]}> 
      <label>{label}</label>
      <textarea placeholder={label} value={value} onChange={(e) => onChange(e.target.value)}/>
    </div>
  )
}

const CollectionSet = ({collections, value, onChange}) => {
  // As far as I understand we could pass only primitive values through "target.value"  
  // But I need both id and name while updating card detail
  // Is there more appropriate way to get around that?
  const handleChange = (e) => {
    const id = e.target.value;
    const name = collections.find(collection => collection.id === id).name;
    onChange({id, name}) 
  }

  return(
    <label>
        Choose a collection: 
        <select value={value} onChange={handleChange}>
          {collections.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
        </select>
    </label>
  )
}
