import React, {useContext, useState, useEffect} from 'react'
import { DataContext } from '../../DataManger';
import styles from './CardForm.module.scss'
import {SubmitButton, CollectionSelect, ContentArea} from '../../components/FormElements'
import SideView from './SideView';

const CardForm = ({initialDetails, collections, onSubmit}) => {
    const {manager} = useContext(DataContext);
  
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
    }, [manager])
  
    return(
        <form onSubmit={handleSubmit} className={styles["form"]}>
          <section className={styles["content-section"]}>
            <SideView caption="Front" className="front">
              <ContentArea 
                    className={styles["text-area"]}  
                    value={cardContent.front}
                    placeholder="Front side"
                    onChange={front => setCardContent({...cardContent, front})}/>
            </SideView>
            <SideView caption="Back" className="back">    
              <ContentArea 
                  className={styles["text-area"]}  
                  value={cardContent.back}
                  onChange={back => setCardContent({...cardContent, back})}
                  placeholder="Back side"/>  
            </SideView>
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