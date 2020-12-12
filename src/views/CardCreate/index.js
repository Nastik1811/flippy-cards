import React, {useContext, useState, useEffect, useCallback} from 'react'
import EditorWindow from '../../components/EditorWindow';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import { CollectionSelect } from '../../components/FormElements';
import styles from './CardForm.module.scss'
import SideView from './SideView'
import SubmitButton from '../../components/FormElements/SubmitButton'
import { useHistory } from 'react-router-dom';


const CardCreate = () => {
    const {token} = useContext(AuthContext)
    const {request, error} = useHttp(token)
    const history = useHistory()

    const [collections, setCollections] = useState([])

    const [cardDetail, setCardDetail] = useState({
      front: "",
      back: "",
      collection_id: null
    })

    useEffect(() => {
        const getCollections = async () => {
          try{
            const data = await request('/api/collections')
            setCollections(data.collections)
          }catch(e){}
        }     
        getCollections()
      }, [])

    const handleSubmit = async (e) => {
      e.preventDefault()
      try{
          await request('/api/cards', 'POST', cardDetail)
          history.push('/manage/cards')
        }catch(e){
          console.log(e)
        }
      }

    return (
      <EditorWindow caption="New card" onReturn={() => {}}>
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