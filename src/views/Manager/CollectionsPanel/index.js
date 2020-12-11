import React, { useState, useEffect } from 'react'
import CollectionPreview from './CollectionPreview'
import Panel from '../Panel'
import CollectionCreate from '../../CollectionCreate'
import { Route } from 'react-router-dom'
import ConfirmationDialog from './ConfirmationDialog'
import ItemsGrid from '../ItemsGrid'

const CollectionsPanel = () => {
    const [collections, setCollections] = useState(null);

    const [confirmationDetails, setConfirmationDetails] = useState({
        isOpen: false,
        collection: null
    })

    useEffect(() => {
        //let unsubscribe = manager.listenCollections(setCollections)
        //return (unsubscribe)
    }, [])

    const confirmDelete = collection => {
        setConfirmationDetails({
            isOpen:true, 
            collection
        })
    }

    const handleDelete = (id, withCards) => {
        //manager.deleteCollection(id, withCards)
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
        <Panel>
            <ItemsGrid newItemUrl={"/manage/collections/new"}>
                {collections ? 
                    collections.map(c =>
                         <CollectionPreview collection={c} key={c.id} onDelete={() => confirmDelete(c)} />) 
                    : null
                    }
            </ItemsGrid>
            <Route path='/manage/collections/new' render={CollectionCreate}/>
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
