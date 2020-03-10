import React from 'react'


const CollectionPreview = () => {
    return(
        <div className="preview-container">
            <div className="preview preview-main">
                <header className="preview-header">
                    <div className="preview-title">Collection name</div>
                    <div className="actions">
                        <i>x</i>
                    </div>
                </header>
                <div className="preview-details">
                    <div >20 cards total</div>
                    <div >12 cards left</div>
                </div>
            </div>
            <div className="preview border"></div>
        </div>
    )
}

export default CollectionPreview;