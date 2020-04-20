import React, {useCallback, useContext, useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import styles from './CardEditor.module.scss'
import { DataContext } from '../../DataManger';

const CardEditor = ({history}) => {
  const {manager} = useContext(DataContext);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchData = async () => await manager.getCollections().then(data => setCollections(data));
    fetchData()
  }, [manager])

  const handleSubmit = useCallback(
      async event => {
        event.preventDefault();
        const { front, back, collection} = event.target.elements;
        
        await manager.addCard({
          content:{
            front: front.value,
            back: back.value,
          },
          collection_id: collection.value
        })

        history.push("/home");
      }, [history, manager] );

    return (
            <div className={styles["editor"]}>
                <form onSubmit={handleSubmit} className={styles["card-editor-form"]}>
                    <div className={styles["row-flex-container"]}>
                        <div className={styles["edit-container"]}>
                             <label>FRONT SIDE</label>
                            <textarea placeholder="front side" name="front" />
                        </div>
                        <div className={styles["edit-container"]}> 
                            <label>BACK SIDE</label>
                            <textarea placeholder="back side" name="back" />
                        </div>
                    </div>

                    <label>
                        Choose a collection: 
                        <select name="collection" >
                          {collections.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
                        </select>
                    </label>
                    <input type="submit" className={styles["submit-btn"]} value="Save" />
                </form>
                
            </div>
    )
}

export default withRouter(CardEditor);