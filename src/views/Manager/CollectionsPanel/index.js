import React, { useState, useEffect, useContext } from 'react'
import CollectionPreview from './CollectionPreview'
import { DataContext } from '../../../DataManger'
import Panel from '../Panel'
import CollectionCreate from '../../CollectionCreate'
import { Route } from 'react-router-dom'

const CollectionsPanel = () => {
    const {manager} = useContext(DataContext);
    const [collections, setCollections] = useState(null);

    useEffect(() => {
        let unsubscribe = manager.listenCollections(setCollections)
        return (unsubscribe)
    }, [manager])

    return (
        <Panel 
            newItemUrl={"/manage/collections/new"}
            items={collections? collections.map(c => <CollectionPreview collection={c} key={c.id}/>) : null}
        >
            <Route path='/manage/collections/new' render={CollectionCreate}/>
        </Panel>

        )
}

export default CollectionsPanel
