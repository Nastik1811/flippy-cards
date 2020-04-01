import React from 'react'
import { Link } from 'react-router-dom'


const CollectionReviewLink = ({slug, name, cards}) => {
    return(
       
        <div className="preview-container">
            <div className="preview-component main-component">
                <div className="link-preview-title">{name}</div>
                <div className="link-preview-details">{cards} cards to review</div>
            </div>

            <Link to={`/session/${slug}`}>
                <div className="preview-component overlay-component"> Click to start </div>
            </Link>
            
        </div>
       
    )
}

export default CollectionReviewLink;