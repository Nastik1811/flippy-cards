import React from 'react'
const Card= () => {
    return(
        <div className="card-container">
            <div className="card-back">
                Back side
            </div>
            <div className="card-front">
                Front side
            </div>
            <div className="card-caption">Click to flip</div>
        </div>
    )
}

export default Card;