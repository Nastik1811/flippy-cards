import React from 'react'


const CollectionPreview = () => {
    return(
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
    )
}

export default CollectionPreview;