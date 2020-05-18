import React, {useState} from 'react'
import styles from './CardForm.module.scss'
import {SubmitButton, CollectionSelect} from '../../components/FormElements'
import SideView from './SideView';

const CardForm = ({initialDetails, collections, onSubmit}) => {
  
    const [cardContent, setCardContent] = useState(initialDetails.content);
    const [cardCollection, setCardCollection] = useState(initialDetails.collection);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if(cardContent.front === "" || cardContent.back === ""){
        alert("Please, fill both card sides first.")
      }
      else{
        onSubmit({
          content: cardContent, 
          collection: cardCollection
        })
      }
    }
  
    return(
        <form onSubmit={handleSubmit} className={styles["form"]}>

          <section className={styles["content-section"]}>
            <SideView 
              side="front" 
              value={cardContent.front}
              onChange={front => setCardContent({...cardContent, front})}
            />
            <SideView 
              side="back" 
              value={cardContent.back}
              onChange={back => setCardContent({...cardContent, back})}
            />
          </section>
          <section className={styles["select-section"]}>
            <label> Set a collection 
            <CollectionSelect 
              collections={collections}
              value={cardCollection} 
              onChange={setCardCollection}
              className={styles["select"]}  
            />
            </label>
          </section> 
          <SubmitButton label="Save" className={styles["submit-btn"]} />
        </form>
    )
  }
  export default CardForm