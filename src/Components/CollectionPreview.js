import React from 'react'
import { Link } from 'react-router-dom'

const CollectionPreview = ({slug, name, created}) => {
    return(
        <Link to={`/collection/${slug}`}>

            <div className="preview-container">
            <div className="preview-component collection-preview">
                <header className="preview-header">
                    <span className="preview-title">{name}</span>
                </header>
                <div className="preview-details">
                </div>
                <footer className="preview-footer">Created 12.12.2020</footer>
            </div>
            <div className="preview-component outline-border"></div>
        </div>
        </Link>
        
    )
}

export default CollectionPreview;