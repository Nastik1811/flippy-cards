import React, { useContext, useState } from 'react'
import CollectionReviewLink from './CollectionReviewLink'
import {collections} from "../../DummyData" 
import { Link } from 'react-router-dom'


const CollectionsBoard = props => {
    let links = collections.map((c, i) => <CollectionReviewLink slug={i} name={c.name} cards={c.cards.length}/>)
    return (
        <section>
            <header className="section-header">You can also choose a collection:</header>
            <div className="grid-container">
                {links}
                <div className="preview-container">
                    <Link to="/manage" className="accent-btn medium" id="to-manage-btn">Manage <wbr/> collections</Link>
                </div>
            </div>
        </section>
    )
}

export default CollectionsBoard