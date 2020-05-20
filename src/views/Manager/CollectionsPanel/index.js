import React, { useState, useEffect, useContext } from 'react'
import CollectionPreview from './CollectionPreview'
import { DataContext } from '../../../DataManger'
import Panel from '../Panel'
import CollectionCreate from '../../CollectionCreate'
import { Route } from 'react-router-dom'
import ConfirmationDialog from './ConfirmationDialog'

const CollectionsPanel = () => {
    const {manager} = useContext(DataContext);
    const [collections, setCollections] = useState(null);

    const [confirmationDetails, setConfirmationDetails] = useState({
        isOpen: false,
        collection: null
    })

    useEffect(() => {
        let unsubscribe = manager.listenCollections(setCollections)
        return (unsubscribe)
    }, [manager])

    const confirmDelete = collection => {
        setConfirmationDetails({
            isOpen:true, 
            collection
        })
    }

    const handleDelete = (id, withCards) => {
        manager.deleteCollection(id, withCards)
        closeConfirmation()
    }

    const closeConfirmation = () => {
        setConfirmationDetails(
            {
                isOpen: false,
                collection: null
            }
        )
    }

    return (
        <>
            <Panel newItemUrl={"/manage/collections/new"}>
                {collections ? 
                    collections.map(c =>
                         <CollectionPreview collection={c} key={c.id} onDelete={() => confirmDelete(c)} />) 
                    : null
                    }
            </Panel>
            <Route path='/manage/collections/new' render={CollectionCreate}/>
            <ConfirmationDialog 
                isOpen={confirmationDetails.isOpen} 
                collection={confirmationDetails.collection} 
                onDismiss={closeConfirmation} 
                onConfirm={handleDelete} 
                />
        </>
        )
}

export default CollectionsPanel
