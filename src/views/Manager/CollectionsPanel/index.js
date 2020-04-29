import React, { useState, useEffect, useContext } from 'react'
import CollectionPreview from './CollectionPreview'
import { DataContext } from '../../../DataManger'
import Panel from '../Panel'

const CollectionsPanel = () => {
    const {manager} = useContext(DataContext);
    const [collections, setCollections] = useState(null);

    useEffect(() => {
        let isSubscribed = true;
        manager.getCollections().then(data => {
            if(isSubscribed) setCollections(data)
        })
        return () => isSubscribed = false
    }, [manager])

    return (
        <Panel pathToNew={"/collection/new"}>
            {collections? collections.map(c => <CollectionPreview collection={c} key={c.id}/>) : null}
        </Panel>)
}

export default CollectionsPanel
