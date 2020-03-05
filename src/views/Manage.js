import ReactDOM from 'react-dom'
import React from 'react'
import CardPreview from '../Components/CardPreview'
import CollectionPreview from '../Components/CollectionPreview'


const Manage = () => {
    return (
        <>
            <nav className="tabbar">
                <ul className="tab-links">
                    <li><a href='#'>Collections</a></li>
                    <li><a href='#'>Cards</a></li>
                </ul>
                <hr/>
            </nav>
            <div id="control-board">
                <div className="previews-container">
                    <CollectionPreview/>
                    <CollectionPreview/>
                    <CollectionPreview/>
                    <CollectionPreview/>
                </div>
            </div>
            
        </>
    )
}

export default Manage;