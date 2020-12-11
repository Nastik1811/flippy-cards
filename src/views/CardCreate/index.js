import React, {useContext, useState, useEffect, useCallback} from 'react'
import EditorWindow from '../../components/EditorWindow';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';

const CardCreate = () => {
    const {token} = useContext(AuthContext)
    const {request} = useHttp(token)

    const [collections, setCollections] = useState([])

    const [cardDetail, setCardDetail] = useState({
      front: "",
      back: "",
      collection_id: null
    })

    useEffect(() => {
        getCollections = async () => {
          try{
            const data = await request('/api/collection')
            setCollections(data)
          }catch(e){}
        }     
        getCollections()
      }, [])

    const handleSubmit = () => {
        try{
          await request('/api/card', 'PUSH', cardDetail)
          setCompleted(true)
        }catch(e){
          alert(error)
        }
      }

    return (
      <EditorWindow caption="New card" onReturn={() => setCompleted(true)}>
        <form onSubmit={handleSubmit} className={styles["form"]}>
          <section className={styles["content-section"]}>
              <SideView 
                side="front" 
                value={cardDetail.front}
                onChange={front => setCardDetail(details => ({...details, front}))}
              />
              <SideView 
                side="back" 
                value={cardDetail.back}
                onChange={back => setCardDetail(details => ({...details, back}))}
              />
            </section>

            <section className={styles["select-section"]}>
              <label> Set a collection 
                <CollectionSelect
                  collections={collections}
                  value={cardDetail.collection_id} 
                  onChange={collection_id => setCardDetail(details => ({...details, collection_id}))}
                  className={styles["select"]}  
                />
              </label>
            </section> 

            <SubmitButton label="Save" className={styles["submit-btn"]} />
          
          </form>
      </EditorWindow> 
      )
  }

  export default CardCreate