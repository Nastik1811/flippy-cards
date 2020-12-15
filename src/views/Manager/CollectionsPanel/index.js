import React, { useState, useEffect, useContext } from 'react'
import CollectionPreview from './CollectionPreview'
import Panel from '../Panel'
import CollectionCreate from '../../CollectionCreate'
import { Route, useHistory } from 'react-router-dom'
import ConfirmationDialog from './ConfirmationDialog'
import ItemsGrid from '../ItemsGrid'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import Loader from '../../../components/Loader'

const CollectionsPanel = () => {
    const [collections, setCollections] = useState(null)
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp(token)

    const [confirmationDetails, setConfirmationDetails] = useState({
        isOpen: false,
        collection: null
    })

    useEffect(() => {
        const fetchCollections = async () => {
            try{
                const data = await request('/api/collections')
                setCollections(data.collections)
            }catch(e){
                console.error(e)
            }
        }
        fetchCollections()
    }, [])

    const confirmDelete = collection => {
        setConfirmationDetails({
            isOpen:true, 
            collection
        })
    }

    const handleDelete = async (id, includeCards) => {
        try{
            if(includeCards){
                await request(`/api/cards?collectionId=${id}`, 'DELETE')
            }
            await request(`/api/collections/${id}`, 'DELETE')
            setCollections(data => data.filter(c => c.id !== id))
        }catch(e){
            alert(e.message)
        }finally{
            closeConfirmation()
        }
        
    }

    const closeConfirmation = () => {
        setConfirmationDetails(
            {
                isOpen: false,
                collection: null
            }
        )
    }

    if(loading){
        return <Loader/>
    }

    return (
        <Panel>
            <ItemsGrid newItemUrl={"/manage/collections/new"}>
                {collections ? 
                    collections.map(c =>
                         <CollectionPreview collection={c} key={c.id} onDelete={() => confirmDelete(c)} />) 
                    : null
                }
            </ItemsGrid>
            <Route path='/manage/collections/new'>
                <CollectionCreate onCreate={(collection) => setCollections(data => [...data, collection])}/>
            </Route>
            <ConfirmationDialog 
                isOpen={confirmationDetails.isOpen} 
                collection={confirmationDetails.collection} 
                onDismiss={closeConfirmation} 
                onConfirm={handleDelete} 
                />
        </Panel>
        )
}

export default CollectionsPanel
