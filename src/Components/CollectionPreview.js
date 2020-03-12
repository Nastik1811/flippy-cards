import React from 'react'
import { Link } from 'react-router-dom'

const CollectionPreview = () => {
    return(
        <Link to={`/collection/1`}>

            <div className="preview-container">
            <div className="preview-component collection-preview">
                <header className="preview-header">
                    <div className="preview-title">Collection name</div>
                </header>
                <div className="preview-details">
                </div>
                <footer className="preview-footer">Created 12.03.2020</footer>
            </div>
            <div className="preview-component outline-border"></div>
        </div>
        </Link>
        
    )
}

export default CollectionPreview;