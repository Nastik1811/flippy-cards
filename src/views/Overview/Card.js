import React from 'react'

const Card = ({card, isFlipped, onClick}) => {

    return (
        <div className={isFlipped? "card flipped" : "card"} onClick={onClick}>
            
            <div className="card-front">{card.front}
            </div>
            <div className="card-back">{card.back}
            </div>
            <span className="card-caption">Click to flip</span>
        </div>
    )
}

export default Card;