import React, {useContext, useState, useEffect} from 'react'
import { DataContext } from '../../DataManger';
import styles from './CardForm.module.scss'
import {SubmitButton, CollectionSelect, ContentArea} from '../FormElements'

const CardForm = ({initialDetails, onSubmit}) => {
    const {manager} = useContext(DataContext);
  
    const [collections, setCollections] = useState([]);
  
    const [cardContent, setCardContent] = useState(initialDetails.content);
    const [cardCollection, setCardCollection] = useState(initialDetails.collection);
  
    const handleSubmit = () => {
      if(cardContent.front === "" || cardContent.back === ""){
        alert("Please, fill both card sides first.")
      }
      else{
        onSubmit({content: cardContent, collection: cardCollection})
      }
    }
  
    useEffect(() => {
      manager.getCollections().then(data => setCollections(data))
    }, [manager])
  
    return(
      <div className={styles["editor"]}>
        <form onSubmit={handleSubmit} className={styles["card-editor-form"]}>
          <div className={styles["row-flex-container"]}>
              <ContentArea 
                label="front" 
                className={styles["edit-container"]} 
                onChange={(front) => setCardContent({...cardContent, front})}/>
              <ContentArea 
                label="back" 
                className={styles["edit-container"]}  
                onChange={(back) => setCardContent({...cardContent, back})}/>
          </div>
          <CollectionSelect 
            collections={collections}
            value={cardCollection} 
            onChange={collection => setCardCollection(collection) }
          />
          <SubmitButton label="Save" className={styles["submit-btn"]} />
        </form>
      </div>
    )
  }

  export default CardForm