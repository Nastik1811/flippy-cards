import React from 'react'
import { Link } from 'react-router-dom'


const CollectionReviewLink = props => {
    let slug = 1;
    return(
       
        <div className="preview-container">
            <div className="preview preview-main hide-text">
                <div className="link-preview-title">Title</div>
                <div className="link-preview-details">15 cards</div>
            </div>
            <Link to={`/session/${slug}`}><div className="preview preview-overlay border"> Click to start </div></Link>
        </div>
       
    )
}

export default CollectionReviewLink;